# PDF to Excel Table Extractor

A robust Python tool to extract tables from PDF files and save them into formatted Excel sheets. This tool handles complex table structures, including merged cells and hierarchical headers, ensuring high-fidelity data extraction.

## 🚀 Features

- **Accurate Extraction**: Extracts tables from PDFs and saves each one to a separate Excel sheet.
- **Formatting**: Preserves professional styling (colors, borders, fonts) similar to the original PDF.
- **Merged Cell Support**: intelligently handles merged columns and hierarchical headers (e.g., "Linked Business" spanning "Life", "Pension", "Health").
- **Batch Processing**: Process entire directories of PDFs at once.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/codewithswamitech/data_extraction_pdf.git
    cd data_extraction_pdf
    ```

2.  **Install dependencies**:
    ```bash
    pip install pdfplumber openpyxl
    ```

## 🛠️ Usage

### 1. Basic Usage (Single File)

Use `pdf_to_excel_tables.py` to extract tables from a single PDF.

```bash
python pdf_to_excel_tables.py input_document.pdf [output_filename.xlsx]
```

-   **Example**:
    ```bash
    python pdf_to_excel_tables.py financial_report.pdf
    ```
    (Creates `financial_report_Tables.xlsx` in the `Output_excel` folder)

-   **With Custom Output**:
    ```bash
    python pdf_to_excel_tables.py report.pdf my_tables.xlsx
    ```

### 2. Batch Processing (Multiple Files)

Use `batch_extract_tables.py` to process all PDFs in a directory.

```bash
python batch_extract_tables.py /path/to/pdf_folder
```

-   **Example**:
    ```bash
    python batch_extract_tables.py ./pdfs
    ```

### 3. Advanced Merged Column Detection

For PDFs with complex, multi-level headers (e.g., financial statements), use the smart merged column extractor.

```bash
python extract_tables_smart_merged.py input.pdf
```

## 📂 Project Structure

-   `pdf_to_excel_tables.py`: **Main script** for standard extraction.
-   `batch_extract_tables.py`: Script for batch processing multiple PDFs.
-   `extract_tables_smart_merged.py`: specialized script for handling complex merged headers.
-   `src/`: Contains core logic (`extractor.py`, `writer.py`, `styles.py`).
-   `Output_excel/`: Default output directory for generated Excel files.

## ⚠️ Troubleshooting

-   **No tables found**: Ensure the PDF contains actual text-based tables, not just images.
-   **Permission denied**: Close the Excel file if it's open before running the script.
-   **Complex Layouts**: For very complex nested headers, try `extract_tables_smart_merged.py`.

## 📄 License

This project is open-source and available for educational and commercial use.
