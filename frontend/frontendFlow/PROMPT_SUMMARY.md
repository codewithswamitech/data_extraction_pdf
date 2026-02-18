# Quick Prompt - PDF to Excel Table Extractor UI

## Build a Modern Web App for PDF to Excel Table Extraction

### Core Requirements

**User Flow:**
1. Upload PDF file (drag & drop)
2. Show interactive loading/processing with real-time progress
3. Display success with summary
4. Provide "View Excel" and "Download Excel" buttons
5. Excel viewer must allow editing cells
6. Download button to save edited Excel

### Tech Stack (Suggested)
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **react-data-grid** or **Handsontable** for Excel viewing/editing
- **react-dropzone** for file upload

### Key Features to Implement

#### 1. File Upload
- Large drag-and-drop zone with visual feedback
- Click-to-browse option
- PDF validation and size limits
- Upload progress indicator

#### 2. Processing State
- Animated progress bar (0-100%)
- Step-by-step progress display:
  - "Uploading file..."
  - "Reading PDF..."
  - "Detecting tables..."
  - "Extracting tables..."
  - "Creating Excel..."
  - "Formatting sheets..."
- Real-time percentage updates
- Tables detected counter
- Estimated time remaining

#### 3. Success Screen
- Success animation/checkmark
- Summary card showing:
  - Tables extracted
  - Sheets created
  - File size
  - Processing time
- Two main buttons:
  - "View Excel" (primary, large)
  - "Download Excel" (secondary)

#### 4. Excel Viewer (Modal/Full-screen)
- Tab navigation for all sheets (Table_1, Table_2, etc.)
- Search bar to find sheets
- Spreadsheet grid with:
  - Freeze top row (headers)
  - Alternating row colors
  - Cell borders
  - Auto-sized columns
- Edit mode toggle:
  - Double-click to edit cells
  - Undo/Redo support
  - Copy/Paste functionality
- Toolbar with:
  - Add/Delete Row & Column buttons
  - Formatting options (bold, colors)
  - Freeze headers toggle
- Footer with:
  - Sheet navigation (Prev/Next)
  - "Save Changes" button
  - "Download" button

#### 5. Download Functionality
- Download entire Excel file
- Download current sheet only
- Show filename before download
- Download progress indicator

### Design Requirements

**Color Scheme:**
- Primary: #2563EB (Blue)
- Success: #10B981 (Green)
- Excel Header: #1F4E79 (Dark Blue)
- Background: #F8FAFC

**Layout:**
- Clean, modern design
- Centered content with max-width
- Responsive (mobile, tablet, desktop)
- Smooth animations and transitions

**Components Needed:**
- Upload Zone (large, prominent)
- Progress Bar (circular or linear)
- Success Card (summary + buttons)
- Excel Viewer Modal (main feature)
- Sheet Tabs (horizontal scroll)
- Spreadsheet Grid (data table)
- Download Button

### Backend Integration

**Create API endpoints:**
- POST `/api/upload-pdf` - Upload and start processing
- GET `/api/progress/{id}` - Get processing progress
- GET `/api/download/{id}` - Download Excel file
- GET `/api/excel-data/{id}` - Get Excel data for viewer
- POST `/api/save-excel/{id}` - Save edited Excel
- WebSocket `/api/ws/{id}` - Real-time progress updates

**Processing Backend:**
- Use Python scripts: `pdf_to_excel_tables.py`
- Extract tables with pdfplumber
- Generate Excel with openpyxl
- Stream progress updates

### Important Notes

1. **User Experience:**
   - Clear feedback at every step
   - No "stuck" states - always show progress
   - Handle errors gracefully with helpful messages
   - Loading states should be animated and engaging

2. **Excel Viewer:**
   - Must handle large files (200+ rows per sheet, 100+ sheets)
   - Smooth scrolling, no lag
   - Keyboard navigation (arrows, Tab, Enter)
   - Cell editing must be intuitive

3. **Performance:**
   - Page load: < 2 seconds
   - Upload: Show progress
   - Processing: Real-time updates, no browser freeze
   - Excel rendering: Efficient with lazy loading if needed

4. **Accessibility:**
   - Keyboard navigation
   - ARIA labels
   - Screen reader support
   - Color contrast (WCAG AA)

### Component Structure (Suggested)

```
src/
├── app/page.tsx              # Main page
├── components/
│   ├── UploadZone.tsx        # Drag & drop
│   ├── ProgressBar.tsx        # Processing progress
│   ├── SuccessCard.tsx       # Results display
│   ├── ExcelViewer.tsx        # Main viewer modal
│   ├── SheetTabs.tsx          # Sheet navigation
│   ├── Spreadsheet.tsx         # Data grid
│   └── DownloadButton.tsx     # Download action
└── hooks/
    ├── useFileUpload.ts
    ├── usePdfProcessing.ts
    └── useExcelViewer.ts
```

### Mockup Description

**Upload Screen:**
- Clean header with title
- Large dashed-border box in center
- Document icon + "Drag & Drop PDF here"
- Click to browse button
- Recent files list below

**Processing Screen:**
- Progress circle or bar at top
- Percentage display large and clear
- Checklist of stages (upload, read, detect, extract, create, format)
- "Tables detected: 193" counter
- Cancel button

**Success Screen:**
- Big checkmark animation
- Summary card with stats
- Two large buttons: "View Excel" (primary), "Download" (secondary)

**Excel Viewer:**
- Full-screen modal overlay
- Sheet tabs across top (scrollable)
- Spreadsheet grid fills middle
- Freeze headers
- Edit toggle switch
- Toolbar with editing tools
- "Save" and "Download" buttons at bottom

### Success Criteria

✅ User can upload PDF easily (drag & drop + click)
✅ Processing shows clear, real-time progress (never looks stuck)
✅ Success screen shows summary and two action buttons
✅ Excel viewer opens smoothly with all sheets accessible
✅ User can edit cells (double-click, type, save)
✅ Download works reliably for both original and edited files
✅ UI is responsive (mobile to desktop)
✅ Performance is smooth (no lag, fast loading)
✅ Error handling is clear and helpful

### Quick Start for Developer

1. Create Next.js 15 project with TypeScript
2. Install: `shadcn/ui`, `react-dropzone`, `react-data-grid`
3. Implement UploadZone component first
4. Add ProgressBar and ProcessingSteps components
5. Create SuccessCard with summary
6. Build ExcelViewer modal with SheetTabs
7. Integrate Spreadsheet component with edit mode
8. Add Download functionality
9. Connect to backend APIs
10. Test entire flow end-to-end

### Additional Nice-to-Have Features

- Batch upload (multiple PDFs)
- File preview before processing
- Export to CSV/PDF
- Share functionality
- Recent files history
- Dark mode toggle
- Keyboard shortcuts
- Save drafts

---

## Final Deliverable

A fully functional Next.js 15 web application where users can:
1. Upload PDF files
2. See real-time processing progress
3. View extracted tables in an Excel-like interface
4. Edit the tables
5. Download the final Excel file

The app should be modern, responsive, accessible, and provide an excellent user experience.

---

**Ready to build! 🚀**
