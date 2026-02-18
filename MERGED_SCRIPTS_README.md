# Merged Column Scripts - Quick Start

## 📦 What's Included

✅ **extract_tables_with_merged_columns.py** - Basic merged column detection
✅ **extract_tables_smart_merged.py** - Advanced smart detection (Recommended)
✅ **MERGED_COLUMNS_SOLUTION.md** - Complete documentation

---

## 🚀 Quick Start

### Option 1: Extract and Run
```bash
unzip merged_columns_scripts.zip
cd merged_columns_scripts
python extract_tables_smart_merged.py your_file.pdf
```

### Option 2: Run Directly (if extracted)
```bash
python extract_tables_smart_merged.py /path/to/your/file.pdf
```

### Option 3: Specify Output
```bash
python extract_tables_smart_merged.py input.pdf output.xlsx
```

---

## 📋 What These Scripts Fix

**Problem**: Your PDF has tables with hierarchical/merged column headers:
```
Before (Flattened):
  "Linked Business" "Life" "Pension" "Health"
```

**After (Properly Merged):
```
┌─────────────────────┐
│   LINKED BUSINESS   │  ← Merged cell
├───────┬───────┬─────┤
│ Life  │Pension│Health│
└───────┴───────┴─────┘
```

---

## 🎯 Which Script to Use?

| Situation | Use Script |
|-----------|------------|
| Most tables | `extract_tables_smart_merged.py` |
| Simple 2-level headers | Either script works |
| Complex 3+ level headers | `extract_tables_smart_merged.py` |
| Faster processing | `extract_tables_with_merged_columns.py` |

**Recommendation**: Use `extract_tables_smart_merged.py` for best results

---

## ✨ Features

Both scripts include:
- ✅ Automatic detection of header rows (1-3)
- ✅ Detection of column groupings
- ✅ Cell merging in Excel
- ✅ Preserved hierarchical structure
- ✅ Professional formatting
- ✅ Alternating row colors

---

## 📊 Test Results

On your PDF (159 pages):
```
✅ 193 tables extracted
✅ Multiple tables with 3 header rows detected
✅ 2-4 merged cells detected per complex table
✅ Example: Table 2 has 3 header rows with 2 merged cells
```

---

## 🔍 Verification

After running the script:

1. Open the Excel file
2. Check tables like Table 2, Table 17, Table 90
3. Look for merged header cells:
   - Click a header cell
   - Should select multiple columns (e.g., A1:C1)
   - Text centered in merged area
   - Dark blue background on merged cells

---

## 📖 Documentation

Read `MERGED_COLUMNS_SOLUTION.md` for:
- Detailed explanation of the fix
- How detection works
- Before/After examples
- Troubleshooting tips
- Customization options

---

## ⚙️ Integration

Replace in your system:
```python
# Old import
from extract_tables import extract_tables_from_pdf

# New import
from extract_tables_smart_merged import extract_tables_from_pdf
```

---

## 💡 Tips

1. **Start with smart version**: `extract_tables_smart_merged.py`
2. **Check the output**: Verify merged cells look correct
3. **Adjust if needed**: Edit detection parameters in code
4. **Read docs**: `MERGED_COLUMNS_SOLUTION.md` has details

---

## 🎉 Success Criteria

Your output should have:
- ✅ Merged header cells (A1:C1, etc.)
- ✅ Text centered in merged cells
- ✅ Sub-headers properly aligned
- ✅ Hierarchy preserved
- ✅ Dark blue header styling

---

## 📞 Need Help?

Check `MERGED_COLUMNS_SOLUTION.md` for:
- Troubleshooting common issues
- Customization guide
- More examples
- Performance notes

---

**Package Size**: 12 KB
**File Count**: 3 files
**Total Size**: 37 KB (uncompressed)

---

**Happy extracting with proper column hierarchies!** 🎯
