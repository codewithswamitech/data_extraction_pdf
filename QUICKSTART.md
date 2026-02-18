# Quick Start Guide - PDF to Excel Table Extractor

## Quick Start (3 Simple Steps)

### Step 1: Install Dependencies
```bash
pip install pdfplumber openpyxl
```

### Step 2: Run the Script
```bash
# Basic usage
python pdf_to_excel_tables.py your_file.pdf

# Or use the simple version
python extract_tables_simple.py your_file.pdf
```

### Step 3: Find Your Excel File
The output Excel file is saved to:
```
/home/z/my-project/download/your_file_Tables.xlsx
```

That's it! 🎉

---

## Which Script Should You Use?

### 1. `pdf_to_excel_tables.py` (Full-featured)
**Use this when you want:**
- Complete control over output path
- Detailed progress information
- Advanced options

**Example:**
```bash
python pdf_to_excel_tables.py report.pdf custom_output.xlsx
```

### 2. `extract_tables_simple.py` (Easy to use)
**Use this when you want:**
- Simple, quick extraction
- Automatic output naming
- Clean, minimal output

**Example:**
```bash
python extract_tables_simple.py report.pdf
```

### 3. `batch_extract_tables.py` (Batch processing)
**Use this when you want to:**
- Process multiple PDFs at once
- Automate workflows
- Process entire folders

**Example:**
```bash
python batch_extract_tables.py ./my_pdf_folder
```

---

## Common Use Cases

### Use Case 1: Extract Tables from One PDF
```bash
python extract_tables_simple.py financial_report.pdf
```
Output: `financial_report_Tables.xlsx`

### Use Case 2: Extract Tables with Custom Name
```bash
python pdf_to_excel_tables.py report.pdf Q3_2025_Tables.xlsx
```

### Use Case 3: Process Multiple PDFs
```bash
python batch_extract_tables.py ./documents
```
Processes all PDFs in `./documents/` folder

### Use Case 4: Process PDFs from Specific Directory
```bash
python batch_extract_tables.py /home/user/reports/2025
```

---

## File Locations

### Input PDF
Place your PDF files anywhere, for example:
- `./my_document.pdf`
- `/home/user/documents/report.pdf`
- `./pdfs/quarterly_report.pdf`

### Output Excel
Files are saved to:
```
/home/z/my-project/download/
```

Each output file is named: `{original_filename}_Tables.xlsx`

---

## What Gets Extracted?

The script extracts:
✅ All tables with clear grid structures
✅ Row and column data
✅ Headers and subheaders
✅ Numbers, text, and dates
✅ Table structure and layout

The script preserves:
✅ Table formatting
✅ Data types
✅ Row order
✅ Column order

---

## Tips & Tricks

### Tip 1: Handle Large PDFs
Large PDFs may take time. Be patient! The script shows progress.

### Tip 2: Check Output Quality
If tables aren't extracted well:
- Try opening the PDF in a viewer
- Check if tables have clear grid lines
- Some complex tables may need manual cleanup

### Tip 3: Batch Processing
To process multiple PDFs, use the batch script:
```bash
python batch_extract_tables.py ./pdfs
```

### Tip 4: Custom Output
Specify your own output location:
```bash
python pdf_to_excel_tables.py report.pdf ./output/tables.xlsx
```

---

## Troubleshooting

### Problem: "No tables found"
**Solution:**
- Check if PDF has actual tables (not just text)
- Open PDF to verify table structure
- Some PDFs don't have extractable tables

### Problem: "File not found"
**Solution:**
- Check the file path is correct
- Use full path: `/home/user/documents/report.pdf`
- Check file extension is `.pdf`

### Problem: "Permission denied"
**Solution:**
- Close any open Excel files
- Check write permissions for output directory

### Problem: Tables look wrong
**Solution:**
- PDF table extraction isn't perfect
- Complex merges may not extract well
- Some manual cleanup in Excel may be needed

---

## Example Workflow

### Scenario: Extracting Financial Reports

1. **Place PDFs in a folder:**
   ```
   ./reports/
     Q1_2025.pdf
     Q2_2025.pdf
     Q3_2025.pdf
   ```

2. **Run batch extractor:**
   ```bash
   python batch_extract_tables.py ./reports
   ```

3. **Find outputs in:**
   ```
   /home/z/my-project/download/
     Q1_2025_Tables.xlsx
     Q2_2025_Tables.xlsx
     Q3_2025_Tables.xlsx
   ```

4. **Open Excel files to view extracted tables**

---

## Need Help?

Check these resources:
- `README_PDF_TO_EXCEL.md` - Detailed documentation
- Script files - Each has comments and examples
- Error messages - Scripts provide helpful error info

---

## Summary

| Script | Best For | Complexity |
|--------|-----------|------------|
| `extract_tables_simple.py` | Quick, single PDF | ⭐ Simple |
| `pdf_to_excel_tables.py` | Full control, custom output | ⭐⭐ Medium |
| `batch_extract_tables.py` | Multiple PDFs, automation | ⭐⭐⭐ Advanced |

Start with `extract_tables_simple.py` for the easiest experience!

---

Happy extracting! 🚀
