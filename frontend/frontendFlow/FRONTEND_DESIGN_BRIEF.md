# Frontend Design Brief - PDF to Excel Table Extractor

## Executive Summary

Build a modern, user-friendly web application that allows users to upload PDF files, extracts tables automatically, provides real-time processing feedback, and offers a powerful Excel viewing/editing interface with download capabilities.

---

## Quick Overview

**What users will do:**
1. Drag & drop or click to upload a PDF file
2. Watch real-time processing with animated progress
3. See success summary with statistics
4. View Excel file in an interactive spreadsheet interface
5. Edit cells if needed
6. Download the Excel file

**Key Features:**
- ✅ Drag & drop PDF upload
- ✅ Real-time processing progress with stages
- ✅ Success summary with stats
- ✅ Excel viewer with sheet navigation
- ✅ Edit mode for cell editing
- ✅ Download original or edited Excel

---

## Tech Stack

### Required
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui** components
- **react-data-grid** or **Handsontable** (Excel viewing/editing)
- **react-dropzone** (File upload)

### Backend Integration
- Python scripts: `pdf_to_excel_tables.py`
- WebSocket or Server-Sent Events for real-time updates
- REST APIs for upload, download, data retrieval

---

## Complete User Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Upload PDF  │ -> │ Processing  │ -> │  Success    │ -> │ View/Download│
│             │    │  Progress   │    │  Summary    │    │   Excel     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Screen 1: Upload Page

### Layout
```
┌──────────────────────────────────────────────────┐
│  Logo + Title + Subtitle                    │
│                                            │
│  ┌────────────────────────────────────┐      │
│  │   📄                           │      │
│  │                                 │      │
│  │  Drag & Drop PDF here           │      │
│  │  or Click to Browse            │      │
│  │                                 │      │
│  │  Max: 50MB | PDF only          │      │
│  └────────────────────────────────────┘      │
│                                            │
│  Recent Files (if any)                     │
└──────────────────────────────────────────────────┘
```

### Features
- Large, prominent drag-and-drop zone (80% width)
- Dashed border that highlights on hover
- Document icon in center
- "Drag & Drop" text above "Click to Browse" button
- File validation (PDF only, < 50MB)
- Upload progress bar
- Recent files list (optional, from local storage)

### Components Needed
- `UploadZone.tsx` - Main drag & drop component
- `FilePreview.tsx` - Show selected file before upload
- `RecentFiles.tsx` - List previously processed files

---

## Screen 2: Processing State

### Layout
```
┌──────────────────────────────────────────────────┐
│  Processing PDF... ⏳                        │
│                                            │
│  [████████████░░░░░] 60%                 │
│                                            │
│  ✓ Upload complete                          │
│  ✓ Reading PDF file                         │
│  ▸ Detecting tables... (125/193)           │
│  ⬜ Extracting tables                        │
│  ⬜ Creating Excel                          │
│  ⬜ Formatting                              │
│                                            │
│  Stats: 159 pages • 193 tables            │
│  Time remaining: ~45 seconds                │
│                                            │
│  [Cancel]                                   │
└──────────────────────────────────────────────────┘
```

### Features
- Large circular progress indicator (or linear bar)
- Percentage display (large, centered)
- Stage-by-stage progress with checkmarks:
  1. Upload file (0-10%)
  2. Read PDF (10-20%)
  3. Detect tables (20-50%)
  4. Extract tables (50-80%)
  5. Create Excel (80-90%)
  6. Format sheets (90-100%)
- Live counter: "Tables detected: 125/193"
- Live counter: "Pages scanned: 89/159"
- Estimated time remaining
- Cancel button with confirmation

### Components Needed
- `ProgressBar.tsx` - Main progress indicator
- `ProcessingSteps.tsx` - Stage-by-stage checklist
- `StatsCard.tsx` - Display live statistics

---

## Screen 3: Success State

### Layout
```
┌──────────────────────────────────────────────────┐
│  ✓ Processing Complete! 🎉                     │
│                                            │
│  ┌────────────────────────────────────┐        │
│  │  Summary                        │        │
│  │  ┌──────────────────────────┐   │        │
│  │  │ Tables extracted:  193   │   │        │
│  │  │ Sheets created:    193   │   │        │
│  │  │ File size:        669KB│   │        │
│  │  │ Processing time:   2m35s│   │        │
│  │  └──────────────────────────┘   │        │
│  └────────────────────────────────────┘        │
│                                            │
│  ┌──────────────┬──────────────────┐         │
│  │   👁 View   │  ⬇ Download      │         │
│  │    Excel    │     Excel        │         │
│  │            │                  │         │
│  │  [Primary]  │  [Secondary]     │         │
│  └──────────────┴──────────────────┘         │
│                                            │
│  [Upload New PDF]                           │
└──────────────────────────────────────────────────┘
```

### Features
- Success animation (confetti or checkmark pop)
- Summary card with clean statistics
- Two large action buttons:
  - "View Excel" - Primary, 56px height
  - "Download Excel" - Secondary, 56px height
- "Upload New PDF" link button

### Components Needed
- `SuccessCard.tsx` - Results display
- `StatItem.tsx` - Individual stat display
- `ActionButtons.tsx` - Primary and secondary buttons

---

## Screen 4: Excel Viewer (Main Feature)

### Layout
```
┌────────────────────────────────────────────────────────┐
│  Excel Viewer - report_Tables.xlsx           [X]    │
├────────────────────────────────────────────────────────┤
│ [Table_1][Table_2][Table_3]...[Table_193]    │
│ [Find sheet...]                               │
├────────────────────────────────────────────────────────┤
│ [✏️ Edit: ON] [↩] [➕Row] [➕Col] [💾 Save]    │
├────────────────────────────────────────────────────────┤
│  ┌────┬────┬────────┬────┬────┬────────┐     │
│  │ A  │ B  │ C      │ D  │ E  │        │     │
│  ├────┼────┼────────┼────┼────┼────────┤     │
│ 1│ Sr │Form│ Descr  │Page│    │        │     │
│  │ No.│No. │        │No. │    │        │     │
│  ├────┼────┼────────┼────┼────┼────────┤     │
│ 2│ 1  │L-1 │Revenue │1-4 │    │        │     │
│  │    │-ARA│Account │    │    │        │     │
│  ├────┼────┼────────┼────┼────┼────────┤     │
│ 3│ 2  │L-2 │Profit  │ 5  │    │        │     │
│  │    │-A-PL│& Loss  │    │    │        │     │
│  └────┴────┴────────┴────┴────┴────────┘     │
│                                                │
│  Table 1 • 2 rows × 4 columns                    │
│  [← Prev]        [Next →]                      │
│                                                │
│  [Save Changes]         [⬇ Download]             │
└────────────────────────────────────────────────────────┘
```

### Features

#### Header
- Title with filename
- Close (X) button
- Horizontal scrollable sheet tabs
- Search bar to find sheets

#### Toolbar
- Edit mode toggle (View/Edit switch)
- Undo/Redo buttons
- Add Row/Delete Row buttons
- Add Column/Delete Column buttons
- Save button
- Cell formatting dropdown (B, I, U, colors)

#### Spreadsheet Grid
- Freeze top row (headers)
- Alternating row colors (white/light gray)
- Dark blue header background (#1F4E79)
- Cell borders
- Auto-sized columns
- Wrap text support
- Hover effects on cells
- Selection highlighting

#### Edit Mode
- Double-click to edit cell
- Inline cell editor
- Cell type detection (number, text, date)
- Formula support (optional)
- Undo/Redo history

#### Navigation
- Sheet tabs with active state
- Previous/Next buttons
- Jump to sheet number
- Keyboard shortcuts (Ctrl+PgUp/PgDn)

#### Footer
- Sheet info: "Table X • Y rows × Z columns"
- Navigation buttons
- Save Changes button
- Download button

### Components Needed
- `ExcelViewer.tsx` - Main modal container
- `SheetTabs.tsx` - Horizontal sheet navigation
- `Spreadsheet.tsx` - Data grid component
- `Toolbar.tsx` - Edit tools
- `CellEditor.tsx` - Inline cell editor

---

## Screen 5: Download Modal

### Layout
```
┌──────────────────────────────────────────┐
│  ⬇ Download Excel File               │
├──────────────────────────────────────────┤
│  File: report_Tables.xlsx           │
│  Size: 669 KB                     │
│  Sheets: 193                       │
│                                    │
│  Options:                           │
│  ☑ All sheets                      │
│  ☐ Current sheet only              │
│  ☐ Compress as .zip                │
│                                    │
│  Format:                            │
│  ⚪ .xlsx (Default)                 │
│  ⚪ .csv                            │
│  ⚪ .pdf                            │
│                                    │
│  ┌────────────────────────────┐        │
│  │   ⬇ Download Now       │        │
│  └────────────────────────────┘        │
│                                    │
│  [Cancel]                           │
└──────────────────────────────────────────┘
```

### Features
- File information display
- Download options:
  - All sheets vs current sheet
  - Format selection (.xlsx, .csv, .pdf)
  - Compression option
- Download button with progress
- Cancel button

### Components Needed
- `DownloadModal.tsx` - Download options modal

---

## Screen 6: Error States

### Layout
```
┌──────────────────────────────────────────┐
│  ⚠️  Processing Failed                 │
├──────────────────────────────────────────┤
│  Error Code: PDF_READ_ERROR_001        │
│  Details: Unable to read page 45       │
│                                    │
│  Troubleshooting:                    │
│  • Check if PDF is not corrupted    │
│  • Ensure PDF is not password-protected│
│  • Try re-downloading               │
│                                    │
│  ┌─────────┬──────────────┐         │
│  │  🔄Retry │📎 New File   │         │
│  └─────────┴──────────────┘         │
└──────────────────────────────────────────┘
```

### Features
- Clear error message
- Error code for debugging
- Specific details
- Troubleshooting tips
- Retry button
- Try new file button

### Components Needed
- `ErrorCard.tsx` - Error display with actions

---

## Design System

### Colors
```css
Primary:      #2563EB  /* Royal Blue */
Secondary:    #64748B  /* Slate Gray */
Success:       #10B981  /* Green */
Error:        #EF4444  /* Red */
Warning:      #F59E0B  /* Orange */
Background:   #F8FAFC  /* Light Gray */
Card:         #FFFFFF  /* White */
ExcelHeader:  #1F4E79  /* Dark Blue */
ExcelEven:     #FFFFFF  /* White */
ExcelOdd:      #F5F5F5  /* Light Gray */
TextMain:     #0F172A  /* Dark Gray */
TextSub:       #64748B  /* Slate Gray */
Border:       #E2E8F0  /* Light Gray */
```

### Typography
```css
Headings:     Inter, Semibold, 24px
Subheadings:  Inter, Medium, 18px
Body:         Inter, Regular, 16px
Small:        Inter, Regular, 14px
Monospace:   JetBrains Mono, Regular, 14px
```

### Spacing
```css
XS:  4px
SM:  8px
MD:  16px
LG:  24px
XL:  32px
XXL: 48px
```

### Components
```css
Button Small:   36px height
Button Medium:  44px height
Button Large:   56px height
Input:         44px height, 8px radius
Card:         24px padding, 12px radius
Modal:         90vw/90vh max, 16px radius
```

---

## Component Tree

```
src/
├── app/
│   ├── page.tsx              # Main page
│   └── layout.tsx
├── components/
│   ├── ui/                  # shadcn/ui
│   ├── UploadZone.tsx        # Drag & drop
│   ├── ProgressBar.tsx        # Progress
│   ├── ProcessingSteps.tsx    # Stage list
│   ├── SuccessCard.tsx       # Results
│   ├── ErrorCard.tsx        # Errors
│   ├── ExcelViewer.tsx       # Modal
│   ├── SheetTabs.tsx         # Tabs
│   ├── Spreadsheet.tsx       # Grid
│   ├── Toolbar.tsx          # Tools
│   ├── CellEditor.tsx       # Edit
│   ├── DownloadModal.tsx     # Download
│   └── RecentFiles.tsx      # History
├── hooks/
│   ├── useFileUpload.ts
│   ├── usePdfProcessing.ts
│   ├── useExcelViewer.ts
│   └── useWebSocket.ts
├── lib/
│   └── api.ts
└── types/
    └── index.ts
```

---

## API Endpoints Required

```typescript
POST   /api/upload-pdf        // Upload and start process
GET    /api/progress/:id       // Get processing progress
GET    /api/download/:id       // Download Excel file
GET    /api/excel-data/:id     // Get Excel data for viewer
POST   /api/save-excel/:id     // Save edited Excel
WS     /api/ws/:id            // WebSocket for real-time updates
```

---

## State Management

```typescript
interface AppState {
  // Upload state
  file: File | null;
  uploadProgress: number;

  // Processing state
  processing: boolean;
  progress: number;
  stage: string;
  tablesDetected: number;
  pagesScanned: number;

  // Success state
  completed: boolean;
  excelFile: ExcelFile | null;

  // Excel viewer state
  viewerOpen: boolean;
  currentSheet: number;
  editMode: boolean;
  cells: CellData[][][];
  sheets: Sheet[];

  // Error state
  error: Error | null;
}
```

---

## Success Criteria

✅ Upload PDF with drag & drop (smooth UX)
✅ Show real-time processing progress (never stuck)
✅ Display success summary with accurate stats
✅ Open Excel viewer with all sheets accessible
✅ Edit cells with double-click (intuitive)
✅ Navigate between sheets smoothly
✅ Download works reliably (original and edited)
✅ Responsive design (mobile → desktop)
✅ Smooth animations (60fps)
✅ Accessible (keyboard, screen reader)
✅ Clear error handling

---

## Implementation Priority

### Phase 1 - Core (MVP)
1. File upload (drag & drop)
2. Processing progress bar
3. Success screen
4. Basic Excel viewer (read-only)
5. Download button

### Phase 2 - Enhancement
1. Excel viewer edit mode
2. Sheet navigation
3. Undo/Redo
4. Cell formatting

### Phase 3 - Polish
1. Recent files
2. Batch upload
3. Export options
4. Dark mode
5. Advanced editing

---

## Testing Checklist

- [ ] Upload PDF (drag & drop)
- [ ] Upload PDF (click browse)
- [ ] Invalid file type shows error
- [ ] File too large shows error
- [ ] Processing shows progress
- [ ] Real-time updates work
- [ ] Success shows correct stats
- [ ] View Excel button works
- [ ] Excel viewer shows all sheets
- [ ] Sheet navigation works
- [ ] Edit mode toggles
- [ ] Cell editing works
- [ ] Undo/Redo works
- [ ] Save works
- [ ] Download works
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Keyboard navigation
- [ ] Screen reader works

---

## Resources

- [Next.js 15](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Data Grid](https://www.ag-grid.com/react-data-grid)
- [Handsontable](https://handsontable.com/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Ready to Build! 🚀**
