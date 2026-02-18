#!/usr/bin/env python3
"""
PDF to Excel Table Extractor
Extracts all tables from a PDF file and saves them to an Excel workbook with each table in a separate sheet.

Usage:
    python pdf_to_excel_tables.py <pdf_file_path> [output_excel_path]

Example:
    python pdf_to_excel_tables.py document.pdf
    python pdf_to_excel_tables.py document.pdf output.xlsx
"""

import sys
import os
from pathlib import Path
from src.extractor import extract_tables_from_pdf
from src.writer import create_excel_from_tables

def main():
    """Main function to orchestrate the PDF to Excel conversion."""
    
    # Check command line arguments
    if len(sys.argv) < 2:
        print("PDF to Excel Table Extractor")
        print("=" * 60)
        print("\nUsage:")
        print("  python pdf_to_excel_tables.py <pdf_file_path> [output_excel_path]")
        print("\nExamples:")
        print("  python pdf_to_excel_tables.py document.pdf")
        print("  python pdf_to_excel_tables.py document.pdf output.xlsx")
        print()
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    # Validate PDF file
    if not os.path.exists(pdf_path):
        print(f"Error: File not found: {pdf_path}")
        sys.exit(1)
    
    if not pdf_path.lower().endswith('.pdf'):
        print("Warning: Input file does not have .pdf extension")
    
    # Determine output path
    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        # Generate output filename from input filename
        pdf_name = Path(pdf_path).stem
        output_dir = os.path.join(os.getcwd(), "Output_excel")
        output_path = os.path.join(output_dir, f"{pdf_name}_Tables.xlsx")
    
    # Validate output path has .xlsx extension
    if not output_path.lower().endswith('.xlsx'):
        output_path += '.xlsx'
    
    print("=" * 60)
    print("PDF to Excel Table Extractor")
    print("=" * 60)
    print()
    
    # Extract tables
    tables = extract_tables_from_pdf(pdf_path)
    
    if not tables:
        print("\nWarning: No tables found in the PDF file.")
        print("The PDF may not contain any tabular data.")
        sys.exit(0)
    
    print(f"\nTotal tables found: {len(tables)}")
    print()
    
    # Create Excel file
    create_excel_from_tables(tables, output_path)
    
    print()
    print("=" * 60)
    print("Process completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    main()

