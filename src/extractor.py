
import pdfplumber
import sys

# Default settings: trust vertical PDF lines for columns, text for rows
TABLE_SETTINGS = {
    "vertical_strategy": "lines",
    "horizontal_strategy": "text",
    "snap_tolerance": 3,
    "join_tolerance": 3,
    "edge_min_length": 10,
    "min_words_vertical": 3,
    "intersection_y_tolerance": 10,
}


def has_merged_columns(table):
    """Check if a table has cells containing multiple merged numeric values."""
    if not table or len(table) < 3:
        return False
    merged = 0
    checked = 0
    for row in table[2:min(len(table), 12)]:
        for cell in row:
            if cell:
                s = str(cell).strip()
                if not s:
                    continue
                checked += 1
                parts = s.split()
                if len(parts) >= 2:
                    nums = sum(1 for p in parts
                               if p == '-' or
                               p.replace(',','').replace('(','').replace(')','')
                                .replace('.','').replace('-','').isdigit())
                    if nums == len(parts) and nums >= 2:
                        merged += 1
    return checked > 0 and (merged / checked) > 0.25


def build_table_from_words(page, bbox):
    """
    Build a table directly from word (x,y) positions within a bounding box.
    
    Instead of relying on pdfplumber's column detection (which misses
    sub-columns without drawn vertical lines), this reads every word's
    exact position and clusters them into rows and columns.
    """
    x0, top, x1, bottom = bbox
    margin = 2

    words = page.extract_words(x_tolerance=3, y_tolerance=3)
    tw = [w for w in words
          if w['x0'] >= x0 - margin and w['x1'] <= x1 + margin
          and w['top'] >= top - margin and w['bottom'] <= bottom + margin]

    if len(tw) < 3:
        return None

    # --- Step 1: Group words into rows by y-position ---
    tw.sort(key=lambda w: w['top'])
    row_groups = []
    current_row = [tw[0]]
    for w in tw[1:]:
        if abs(w['top'] - current_row[-1]['top']) <= 4:
            current_row.append(w)
        else:
            row_groups.append(sorted(current_row, key=lambda w: w['x0']))
            current_row = [w]
    if current_row:
        row_groups.append(sorted(current_row, key=lambda w: w['x0']))

    if not row_groups:
        return None

    # --- Step 2: Find column positions from DATA rows ---
    # Data rows have clean single-value cells, so their x-positions
    # accurately define where columns are. Skip first 3 rows (headers).
    data_x_positions = []
    for rg in row_groups[3:]:
        for w in rg:
            cx = (w['x0'] + w['x1']) / 2
            data_x_positions.append(cx)

    # If not enough data rows, use all rows
    if len(data_x_positions) < 5:
        data_x_positions = []
        for rg in row_groups:
            for w in rg:
                cx = (w['x0'] + w['x1']) / 2
                data_x_positions.append(cx)

    if not data_x_positions:
        return None

    # Cluster x-centers to find column positions
    data_x_positions.sort()
    col_centers = []
    current = [data_x_positions[0]]
    for x in data_x_positions[1:]:
        if x - current[-1] <= 20:  # 20pt tolerance for same column
            current.append(x)
        else:
            col_centers.append(sum(current) / len(current))
            current = [x]
    if current:
        col_centers.append(sum(current) / len(current))

    if len(col_centers) < 2:
        return None

    # --- Step 3: Build the table grid ---
    num_cols = len(col_centers)
    table = []

    for row_words in row_groups:
        row = ['' for _ in range(num_cols)]
        for w in row_words:
            cx = (w['x0'] + w['x1']) / 2
            # Find nearest column center
            best_col = 0
            best_dist = float('inf')
            for i, cc in enumerate(col_centers):
                d = abs(cx - cc)
                if d < best_dist:
                    best_dist = d
                    best_col = i
            # Append word to cell (with space if already has content)
            if row[best_col]:
                row[best_col] += ' ' + w['text']
            else:
                row[best_col] = w['text']
        table.append(row)

    return table


def extract_tables_from_pdf(pdf_path):
    """
    Extract all tables from a PDF file.
    
    Uses line-based extraction by default. When merged columns are detected,
    falls back to building the table directly from word coordinates.
    """
    print(f"Reading PDF file: {pdf_path}")
    all_tables = []

    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"Total pages in PDF: {len(pdf.pages)}")

            for page_num, page in enumerate(pdf.pages, start=1):
                # First pass: normal line-based extraction
                tables = page.extract_tables(TABLE_SETTINGS)

                if not tables:
                    continue

                # Check if any table has merged columns
                page_has_merged = any(has_merged_columns(t) for t in tables)

                if page_has_merged:
                    # Rebuild tables using word positions
                    found = page.find_tables(TABLE_SETTINGS)
                    if found:
                        rebuilt_tables = []
                        for ft in found:
                            rebuilt = build_table_from_words(page, ft.bbox)
                            if rebuilt and len(rebuilt) > 0:
                                # Only use rebuilt if it has more columns
                                old_cols = max(len(r) for r in ft.extract()) if ft.extract() else 0
                                new_cols = max(len(r) for r in rebuilt)
                                if new_cols > old_cols:
                                    rebuilt_tables.append(rebuilt)
                                else:
                                    rebuilt_tables.append(ft.extract())
                            else:
                                rebuilt_tables.append(ft.extract())
                        if rebuilt_tables:
                            tables = rebuilt_tables

                for idx, table in enumerate(tables, start=1):
                    all_tables.append({
                        'table': table,
                        'page': page_num,
                        'index_on_page': idx
                    })

    except FileNotFoundError:
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        sys.exit(1)

    return all_tables
