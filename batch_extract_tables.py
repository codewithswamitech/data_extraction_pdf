#!/usr/bin/env python3
"""
Batch PDF to Excel Table Extractor

Process multiple PDF files at once and extract all tables.

Usage:
    python batch_extract_tables.py <directory>

Example:
    python batch_extract_tables.py ./pdfs
"""

import sys
import os
import glob
from pathlib import Path

# Import the main extractor from src
from src.extractor import extract_tables_from_pdf
from src.writer import create_excel_from_tables


def batch_extract(input_dir):
    """
    Process all PDF files in a directory.
    
    Args:
        input_dir (str): Directory containing PDF files
    """
    
    # Validate directory
    if not os.path.exists(input_dir):
        print(f"❌ Error: Directory not found: {input_dir}")
        sys.exit(1)
    
    # Find all PDF files
    pdf_pattern = os.path.join(input_dir, "*.pdf")
    pdf_files = glob.glob(pdf_pattern)
    
    if not pdf_files:
        print(f"⚠️  No PDF files found in: {input_dir}")
        sys.exit(0)
    
    # Sort files alphabetically
    pdf_files.sort()
    
    print("=" * 60)
    print("Batch PDF to Excel Table Extractor")
    print("=" * 60)
    print()
    print(f"📁 Directory: {input_dir}")
    print(f"📄 PDF files found: {len(pdf_files)}")
    print()
    
    # Process each PDF
    success_count = 0
    error_count = 0
    total_tables = 0
    
    for idx, pdf_path in enumerate(pdf_files, start=1):
        pdf_name = Path(pdf_path).name
        
        print(f"[{idx}/{len(pdf_files)}] Processing: {pdf_name}")
        
        try:
            # Extract tables
            tables = extract_tables_from_pdf(pdf_path)
            
            if not tables:
                print(f"      ⚠️  No tables found")
                error_count += 1
                continue
            
            # Generate output filename
            pdf_stem = Path(pdf_path).stem
            output_dir = os.path.join(os.getcwd(), "Output_excel")
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, f"{pdf_stem}_Tables.xlsx")
            
            # Create Excel file
            create_excel_from_tables(tables, output_path)
            
            print(f"      ✅ Extracted {len(tables)} tables")
            success_count += 1
            total_tables += len(tables)
            
        except Exception as e:
            print(f"      ❌ Error: {e}")
            error_count += 1
        
        print()
    
    # Summary
    print("=" * 60)
    print("BATCH PROCESSING SUMMARY")
    print("=" * 60)
    print(f"Total files processed: {len(pdf_files)}")
    print(f"Successful:           {success_count}")
    print(f"Errors:               {error_count}")
    print(f"Total tables extracted: {total_tables}")
    print()
    
    if success_count > 0:
        print("✅ Batch processing completed!")
        print(f"📂 Output directory: {os.path.join(os.getcwd(), 'Output_excel')}")
    else:
        print("⚠️  No files were processed successfully")


def main():
    """Main function."""
    
    if len(sys.argv) < 2:
        print("Batch PDF to Excel Table Extractor")
        print("=" * 50)
        print("\nUsage:")
        print("  python batch_extract_tables.py <directory>")
        print("\nExample:")
        print("  python batch_extract_tables.py ./pdfs")
        print()
        sys.exit(1)
    
    input_dir = sys.argv[1]
    batch_extract(input_dir)


if __name__ == "__main__":
    main()
