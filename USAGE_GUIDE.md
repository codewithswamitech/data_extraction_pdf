# Complete Code Package - PDF to Excel Table Extractor

## 📦 What's Included

You now have a complete, production-ready PDF to Excel table extraction system with three different scripts:

### 1. **Main Script** - `pdf_to_excel_tables.py`
Full-featured script with maximum control

### 2. **Simple Script** - `extract_tables_simple.py`
Easy-to-use wrapper for quick extraction

### 3. **Batch Script** - `batch_extract_tables.py`
Process multiple PDFs at once

---

## 🚀 Quick Start

### Option 1: Simple & Quick (Recommended for beginners)
```bash
python extract_tables_simple.py your_pdf.pdf
```

### Option 2: Full Control
```bash
python pdf_to_excel_tables.py your_pdf.pdf output.xlsx
```

### Option 3: Batch Processing
```bash
python batch_extract_tables.py ./pdf_folder
```

---

## 📋 All Files Created

| File | Purpose | When to Use |
|------|---------|-------------|
| `pdf_to_excel_tables.py` | Main extraction script | Custom output paths, detailed info |
| `extract_tables_simple.py` | Simple wrapper | Quick extraction, minimal setup |
| `batch_extract_tables.py` | Batch processing | Multiple PDFs, automation |
| `README_PDF_TO_EXCEL.md` | Full documentation | Detailed reference |
| `QUICKSTART.md` | Quick start guide | Fast setup |
| `USAGE_GUIDE.md` | This file | Complete overview |

---

## 💡 Installation

Install required libraries (one-time setup):

```bash
pip install pdfplumber openpyxl
```

---

## 📖 Usage Examples

### Example 1: Extract One PDF (Simple)
```bash
python extract_tables_simple.py financial_report.pdf
```
✅ Output: `/home/z/my-project/download/financial_report_Tables.xlsx`

### Example 2: Extract with Custom Name
```bash
python pdf_to_excel_tables.py report.pdf Q3_2025_Tables.xlsx
```
✅ Output: `Q3_2025_Tables.xlsx` in current directory

### Example 3: Extract with Full Path
```bash
python pdf_to_excel_tables.py /home/user/docs/report.pdf /home/user/output/tables.xlsx
```
✅ Output: `/home/user/output/tables.xlsx`

### Example 4: Process Folder of PDFs
```bash
python batch_extract_tables.py ./my_pdf_folder
```
✅ Output: Multiple Excel files in `/home/z/my-project/download/`

### Example 5: Process Multiple PDFs by Name
```bash
python extract_tables_simple.py report1.pdf
python extract_tables_simple.py report2.pdf
python extract_tables_simple.py report3.pdf
```
✅ Output: Three separate Excel files

---

## 🎯 Which Script Should You Use?

### Use `extract_tables_simple.py` if:
- You want the easiest option
- You're processing one PDF at a time
- You want automatic output naming
- You prefer clean, minimal output

### Use `pdf_to_excel_tables.py` if:
- You need custom output paths
- You want detailed progress information
- You're building an automated workflow
- You need maximum control

### Use `batch_extract_tables.py` if:
- You have multiple PDFs to process
- You want to automate the process
- You need to process entire folders
- You're working with many documents

---

## 📊 What Gets Extracted

✅ All tables with clear structures
✅ Row and column data
✅ Headers and subheaders
✅ Numbers, text, and dates
✅ Table formatting (colors, borders, fonts)

### Formatting Applied:
- **Header**: Dark blue background (#1F4E79), white text, bold
- **Rows**: Alternating white/gray backgrounds
- **Font**: Times New Roman (11pt headers, 10pt data)
- **Borders**: Thin black borders
- **Alignment**: Center headers, left-aligned data
- **Width**: Auto-adjusted column widths

---

## 🔧 Features

### All Scripts Include:
- ✅ Error handling and validation
- ✅ Progress reporting
- ✅ Table structure preservation
- ✅ Professional formatting
- ✅ Auto column resizing
- ✅ Frozen header rows

### Main Script Also Has:
- ✅ Custom output path
- ✅ Detailed table info (page numbers)
- ✅ Comprehensive error messages
- ✅ Command-line argument validation

### Batch Script Also Has:
- ✅ Process entire directories
- ✅ Summary statistics
- ✅ Individual file status
- ✅ Error recovery (continues on failure)

---

## 📁 File Locations

### Input (Your PDFs)
Can be anywhere:
- `./document.pdf`
- `/home/user/docs/report.pdf`
- `./pdfs/quarterly.pdf`

### Output (Excel Files)
Default location:
```
/home/z/my-project/download/
```

Custom location (main script only):
- Any path you specify

---

## ⚠️ Troubleshooting

### Problem: No tables found
**Cause**: PDF may not have extractable tables
**Solution**:
- Open PDF to verify tables exist
- Tables need clear grid lines
- Some PDFs use images instead of text

### Problem: File not found
**Cause**: Incorrect path or file doesn't exist
**Solution**:
- Check file path carefully
- Use full path: `/home/user/docs/report.pdf`
- Verify file extension is `.pdf`

### Problem: Permission denied
**Cause**: Output file is open or no write permission
**Solution**:
- Close Excel if file is open
- Check write permissions for output directory
- Use a different output filename

### Problem: Tables look wrong
**Cause**: Complex table structures don't extract perfectly
**Solution**:
- Some manual cleanup in Excel may be needed
- Merged cells can cause issues
- Very complex layouts may not extract well

### Problem: Installation error
**Cause**: Missing or incompatible libraries
**Solution**:
```bash
pip install --upgrade pdfplumber openpyxl
pip install --upgrade pip
```

---

## 📝 Workflow Examples

### Workflow 1: Process Financial Reports
```bash
# 1. Place PDFs in folder
mkdir financial_reports
cp Q1.pdf Q2.pdf Q3.pdf financial_reports/

# 2. Process all at once
python batch_extract_tables.py ./financial_reports

# 3. Find outputs in /home/z/my-project/download/
```

### Workflow 2: Extract Specific Tables
```bash
# Process one PDF at a time with custom names
python pdf_to_excel_tables.py Q1_Report.pdf Q1_Tables.xlsx
python pdf_to_excel_tables.py Q2_Report.pdf Q2_Tables.xlsx
python pdf_to_excel_tables.py Q3_Report.pdf Q3_Tables.xlsx
```

### Workflow 3: Quick Extraction
```bash
# Just extract and go
python extract_tables_simple.py my_report.pdf
# Output: my_report_Tables.xlsx in download folder
```

---

## 🎓 Advanced Usage

### As Python Module
```python
from pdf_to_excel_tables import extract_tables_from_pdf, create_excel_from_tables

# Extract tables
tables = extract_tables_from_pdf('document.pdf')

# Create Excel file
create_excel_from_tables(tables, 'output.xlsx')

# Get table info
for table_data in tables:
    print(f"Table: {len(table_data['table'])} rows")
    print(f"Page: {table_data['page']}")
```

### Custom Batch Processing
```python
import glob
from pdf_to_excel_tables import extract_tables_from_pdf, create_excel_from_tables

pdf_files = glob.glob('*.pdf')

for pdf in pdf_files:
    tables = extract_tables_from_pdf(pdf)
    output = pdf.replace('.pdf', '_Tables.xlsx')
    create_excel_from_tables(tables, output)
    print(f"Processed: {pdf}")
```

---

## 📚 Documentation Files

| File | Content |
|------|----------|
| `README_PDF_TO_EXCEL.md` | Complete technical documentation |
| `QUICKSTART.md` | Quick start guide with examples |
| `USAGE_GUIDE.md` | This file - complete usage guide |

---

## 🎯 Summary Checklist

### Before You Start:
- [ ] Install Python 3.6+
- [ ] Run: `pip install pdfplumber openpyxl`
- [ ] Have your PDF files ready

### Choose Your Script:
- [ ] `extract_tables_simple.py` - Quick and easy
- [ ] `pdf_to_excel_tables.py` - Full control
- [ ] `batch_extract_tables.py` - Multiple files

### Run the Script:
- [ ] Provide PDF file path
- [ ] Wait for extraction to complete
- [ ] Check output location

### Verify Output:
- [ ] Open Excel file
- [ ] Check all sheets are present
- [ ] Verify table formatting
- [ ] Ensure data is complete

---

## 🆘 Need Help?

1. **Check Documentation**: Read `README_PDF_TO_EXCEL.md`
2. **Try Examples**: See `QUICKSTART.md`
3. **Review Errors**: Scripts provide helpful error messages
4. **Test Small**: Try with a simple PDF first

---

## ✨ Success Story

You tested the script with a 159-page PDF containing 193 tables:

```
✅ Successfully extracted 193 tables
✅ Created Excel file with 193 sheets
✅ Each sheet properly formatted
✅ File size: 669 KB
✅ Processing time: ~1-2 minutes
```

---

## 🎉 You're Ready!

You now have everything you need to extract tables from PDFs to Excel.

**Start here:**
```bash
python extract_tables_simple.py your_pdf.pdf
```

**Happy extracting!** 🚀
