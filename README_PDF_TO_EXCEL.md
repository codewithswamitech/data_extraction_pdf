# PDF to Excel Table Extractor

A Python script that extracts all tables from a PDF file and saves them to an Excel workbook with each table in a separate sheet.

## Features

- ✅ Extracts all tables from PDF files
- ✅ Creates a separate Excel sheet for each table
- ✅ Professional formatting with:
  - Dark blue headers with white text
  - Alternating row colors (white/gray)
  - Times New Roman font
  - Auto-adjusted column widths
  - Bordered cells
  - Frozen header rows
- ✅ Preserves table structure and data
- ✅ Generates detailed progress output

## Prerequisites

Install the required Python libraries:

```bash
pip install pdfplumber openpyxl
```

## Usage

### Basic Usage

Extract tables from a PDF (auto-generates output filename):

```bash
python pdf_to_excel_tables.py your_document.pdf
```

### Specify Output File

Provide a custom output Excel filename:

```bash
python pdf_to_excel_tables.py your_document.pdf output_tables.xlsx
```

### Using with Full Path

```bash
python pdf_to_excel_tables.py /path/to/document.pdf /path/to/output.xlsx
```

## Examples

### Example 1: Simple Extraction
```bash
python pdf_to_excel_tables.py financial_report.pdf
```

This creates: `financial_report_Tables.xlsx` in the `/home/z/my-project/download/` directory

### Example 2: Custom Output Location
```bash
python pdf_to_excel_tables.py report.pdf /home/z/my-project/download/my_tables.xlsx
```

### Example 3: With Relative Path
```bash
python pdf_to_excel_tables.py ./documents/data.pdf ./output/extracted_tables.xlsx
```

## Output

The script generates:
- **Excel file**: One `.xlsx` file containing all tables
- **Sheets**: Each table in a separate sheet named `Table_1`, `Table_2`, etc.
- **Formatting**: Professional styling with colors and borders

## Output Directory

By default, Excel files are saved to:
```
/home/z/my-project/download/
```

You can specify a different location by providing the full path as the second argument.

## Sample Output

```
============================================================
PDF to Excel Table Extractor
============================================================

Reading PDF file: document.pdf
Total pages in PDF: 45
  Created Table_1: 5 rows × 3 columns (from page 1)
  Created Table_2: 27 rows × 9 columns (from page 2)
  Created Table_3: 15 rows × 7 columns (from page 3)
  ...

Total tables found: 193

✓ Excel file created successfully!
  File: /home/z/my-project/download/document_Tables.xlsx
  Size: 0.67 MB
  Total tables: 193

============================================================
Process completed successfully!
============================================================
```

## Error Handling

The script handles common errors:

- **File not found**: Checks if PDF exists before processing
- **No tables found**: Warns if PDF contains no tabular data
- **Permission errors**: Detects if output file is open
- **Invalid PDF**: Catches and reports PDF reading errors

## How It Works

1. **Read PDF**: Opens the PDF file and scans all pages
2. **Extract Tables**: Uses `pdfplumber` to detect and extract table structures
3. **Create Workbook**: Uses `openpyxl` to create an Excel workbook
4. **Write Data**: Writes each table to a separate sheet
5. **Apply Formatting**: Applies professional styling to all cells
6. **Auto-Resize**: Adjusts column widths based on content
7. **Save File**: Saves the complete Excel workbook

## Table Formatting

Each extracted table includes:

- **Header row**: Dark blue background (#1F4E79), white text, bold
- **Data rows**: Alternating white and light gray backgrounds
- **Borders**: Thin black borders around all cells
- **Font**: Times New Roman (11pt for headers, 10pt for data)
- **Alignment**: Center-aligned headers, left-aligned data
- **Row freeze**: Header row stays visible when scrolling

## Limitations

- Tables must have clear grid lines or structure
- Complex merged cells may not extract perfectly
- Very large tables (>100 rows) may take longer to process
- Scanned PDFs (images) require OCR preprocessing

## Troubleshooting

### No tables found
- Check if PDF has actual tables (not just text)
- Try opening PDF in a viewer to verify table structure

### Tables are merged incorrectly
- PDF tables with complex merges may extract poorly
- Manual cleanup may be required in Excel

### File permission error
- Close any open Excel files with the same name
- Check write permissions for the output directory

### Installation errors
- Ensure Python 3.6+ is installed
- Run: `pip install --upgrade pdfplumber openpyxl`

## Advanced Usage

### Using as a Python Module

```python
from pdf_to_excel_tables import extract_tables_from_pdf, create_excel_from_tables

# Extract tables
tables = extract_tables_from_pdf('document.pdf')

# Create Excel file
create_excel_from_tables(tables, 'output.xlsx')
```

### Processing Multiple PDFs

```bash
#!/bin/bash
for pdf in *.pdf; do
    python pdf_to_excel_tables.py "$pdf"
done
```

## Requirements

- Python 3.6 or higher
- pdfplumber
- openpyxl

## License

This script is provided as-is for educational and commercial use.

## Support

For issues or questions:
1. Check the PDF file structure
2. Verify library installations
3. Review error messages carefully
