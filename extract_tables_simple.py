#!/usr/bin/env python3
"""
Simple PDF to Excel Table Extractor - Easy to use wrapper

Usage:
    python extract_tables_simple.py <pdf_file>

Example:
    python extract_tables_simple.py document.pdf
"""

import sys
import os

# Import the main extractor
from pdf_to_excel_tables import extract_tables_from_pdf, create_excel_from_tables


def main():
    """Simple wrapper for PDF to Excel conversion."""
    
    if len(sys.argv) < 2:
        print("Simple PDF to Excel Table Extractor")
        print("=" * 50)
        print("\nUsage:")
        print("  python extract_tables_simple.py <pdf_file>")
        print("\nExample:")
        print("  python extract_tables_simple.py report.pdf")
        print()
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    
    # Validate input
    if not os.path.exists(pdf_path):
        print(f"❌ Error: File not found: {pdf_path}")
        sys.exit(1)
    
    print("📄 Extracting tables from PDF...")
    print(f"   Input: {pdf_path}")
    print()
    
    # Extract tables
    tables = extract_tables_from_pdf(pdf_path)
    
    if not tables:
        print("⚠️  No tables found in the PDF")
        sys.exit(0)
    
    print(f"   Found {len(tables)} tables")
    print()
    
    # Generate output filename
    import pathlib
    pdf_name = pathlib.Path(pdf_path).stem
    output_path = f"/home/z/my-project/download/{pdf_name}_Tables.xlsx"
    
    print("💾 Creating Excel file...")
    create_excel_from_tables(tables, output_path)
    
    print()
    print("✅ Done! Your Excel file is ready:")
    print(f"   📂 {output_path}")
    print()


if __name__ == "__main__":
    main()
