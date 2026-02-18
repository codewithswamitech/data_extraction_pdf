# Frontend UI Prompt - PDF to Excel Table Extractor

## Project Overview
Build a modern, interactive web application for extracting tables from PDF files and generating Excel files. The UI should provide an excellent user experience with clear feedback, interactive loading states, and powerful Excel viewing/editing capabilities.

---

## Tech Stack Requirements

### Frontend Framework
- **Next.js 15** (App Router) - Modern React framework
- **TypeScript** - For type safety
- **Tailwind CSS** - For styling
- **shadcn/ui** - For UI components (or similar component library)

### Excel Handling
- **react-data-grid** OR **Handsontable** - For viewing and editing Excel files
  - Must support: cell editing, row/column operations, copy/paste, Excel-like experience
  - Alternative: **exceljs** with **react-exceljs**

### PDF Processing
- Backend API endpoint to handle PDF upload
- Python scripts will run server-side for table extraction
- WebSocket or Server-Sent Events for real-time progress updates

### File Upload
- **react-dropzone** - For drag-and-drop PDF upload
- File validation (PDF only, max size limit)
- Progress indicators for large files

---

## UI/UX Requirements

### Page Layout

#### 1. Hero Section
- Modern, clean header with gradient or subtle pattern
- Title: "PDF to Excel Table Extractor"
- Subtitle: "Extract all tables from PDF files instantly"
- Professional icon or illustration

#### 2. Main Content Area
**A. Upload Zone (Initial State)**
- Large, prominent drag-and-drop area
- Dashed border with hover effects
- Icon indicating PDF upload (document icon)
- Text: "Drag & Drop PDF file here or Click to Browse"
- Supporting text: "Supported formats: PDF (Max size: 50MB)"
- File input button for click-to-upload
- Recent files section (if browser storage available)

**B. Processing State (After Upload)**
- Large circular or linear progress indicator
- Animated loading spinner
- Progress text: "Processing PDF..."
- Detailed progress breakdown:
  - "Reading PDF file... (X pages found)"
  - "Detecting tables... (X/ Y pages scanned)"
  - "Extracting tables... (X/ Y tables processed)"
  - "Creating Excel file..."
  - "Formatting sheets... (X/ Y sheets done)"
- Estimated time remaining
- Cancellation option (with confirmation)

**C. Completion State (Success)**
- Success animation/checkmark
- Summary statistics card:
  - Tables extracted: 193
  - Sheets created: 193
  - File size: 669 KB
  - Processing time: 2.5 minutes
- Primary action buttons (large, prominent):
  - "View Excel" (largest, primary color)
  - "Download Excel" (secondary color)
- Secondary actions:
  - "Upload New PDF"
  - "View Summary"

**D. Error State**
- Clear error message with specific details
- Retry button
- "Try Different File" option
- Troubleshooting tips expandable section

#### 3. Excel Viewer (Modal/Overlay)

**Modal Layout:**
- Full-screen or large centered modal (90% viewport)
- Header:
  - Title: "Excel Viewer - [Filename]_Tables.xlsx"
  - Close button (X) - top right
  - Tabs for sheets navigation (e.g., "Table_1", "Table_2", "Table_3...")
  - Search bar to find specific sheet
- Toolbar (below header):
  - Edit mode toggle (View/Edit switch)
  - Undo/Redo buttons
  - Copy/Paste buttons
  - Add Row/Delete Row buttons
  - Add Column/Delete Column buttons
  - Cell formatting options (bold, italic, text color, background)
  - Freeze headers toggle
- Main grid area:
  - Excel-like spreadsheet view
  - Scrollable with sticky headers
  - Column headers highlighted (dark blue)
  - Alternating row colors (white/light gray)
  - Cell borders
  - Editable cells (in edit mode)
  - Cell selection highlighting
  - Keyboard navigation (arrow keys, Tab, Enter)
  - Support for multiline text
- Footer:
  - Sheet summary: "Showing X rows × Y columns"
  - Navigation: "← Previous Sheet | Next Sheet →"
  - "Save Changes" button (if edited)
  - "Download" button

**Tab Navigation:**
- Horizontal scroll for many sheets
- Sheet tabs with active state styling
- Close individual sheets option
- Jump to sheet number input

---

## Features & Functionality

### File Upload
1. **Drag & Drop**
   - Visual feedback when dragging file over drop zone
   - Accept only PDF files
   - Show file preview (name, size)
   - Remove file option before upload

2. **Click to Browse**
   - System file picker
   - Filter to PDF files only

3. **Validation**
   - File type check (must be .pdf)
   - File size limit (e.g., 50MB)
   - Show error messages for invalid files

4. **Progress Feedback**
   - Upload progress bar
   - File size indicator (e.g., "2.5 MB / 5.0 MB")
   - Upload speed indicator

### PDF Processing
1. **Real-time Progress**
   - Use WebSocket or Server-Sent Events for live updates
   - Update progress bar smoothly
   - Show current operation text
   - Display step-by-step progress

2. **Progress Stages**
   - Stage 1: Uploading file (0-10%)
   - Stage 2: Reading PDF (10-20%)
   - Stage 3: Detecting tables (20-50%)
   - Stage 4: Extracting tables (50-80%)
   - Stage 5: Creating Excel (80-90%)
   - Stage 6: Formatting (90-100%)

3. **Status Indicators**
   - Animated progress circle with percentage
   - Stage list with checkmarks for completed stages
   - Current stage highlighted

### Excel Viewer
1. **View Mode**
   - Read-only spreadsheet display
   - Hover effects on cells
   - Copy cell values (Ctrl+C)
   - Click to select cell/row/column

2. **Edit Mode**
   - Double-click to edit cell
   - Inline cell editing
   - Cell type detection (number, text, date)
   - Formula support (optional)
   - Undo/Redo history
   - Auto-save drafts

3. **Navigation**
   - Sheet tabs at top
   - Keyboard shortcuts (Ctrl+PgUp/PgDn)
   - Sheet dropdown menu for quick navigation
   - Previous/Next buttons

4. **Display Features**
   - Freeze top row (headers)
   - Auto-fit column widths
   - Wrap text in cells
   - Search/filter within sheet
   - Zoom controls (+/-)
   - Full-screen mode

5. **Export/Download**
   - Download current sheet only
   - Download entire workbook
   - Download as CSV
   - Download as PDF (optional)

### Download Feature
1. **Download Button**
   - Primary CTA after completion
   - Also available in Excel viewer
   - Show filename before download
   - File size indicator

2. **Download Options**
   - Format selection: .xlsx, .csv, .pdf
   - Include/exclude sheets checkboxes
   - Compression option (.zip for large files)

3. **Download Progress**
   - Download progress bar
   - Success notification
   - "Download Again" option

---

## Design System

### Color Palette
```
Primary: #2563EB (Royal Blue)
Primary Hover: #1D4ED8
Secondary: #64748B (Slate)
Success: #10B981 (Green)
Error: #EF4444 (Red)
Warning: #F59E0B (Orange)
Background: #F8FAFC (Light Gray)
Card Background: #FFFFFF (White)
Text Primary: #0F172A (Dark Gray)
Text Secondary: #64748B (Slate Gray)
Border: #E2E8F0 (Light Gray)
Excel Header: #1F4E79 (Dark Blue)
Excel Row Even: #FFFFFF (White)
Excel Row Odd: #F5F5F5 (Light Gray)
```

### Typography
```
Headings: Inter or Helvetica, 600 weight
Body: Inter or Helvetica, 400 weight
Monospace (code): JetBrains Mono or Fira Code
```

### Spacing
- Base unit: 4px
- Container padding: 24px
- Card padding: 20px
- Button padding: 12px 24px
- Input padding: 10px 14px

### Components
1. **Buttons**
   - Primary: Solid blue with hover effect
   - Secondary: Outlined with hover fill
   - Large: 56px height, prominent
   - Medium: 44px height
   - Small: 36px height

2. **Cards**
   - White background
   - Subtle shadow (box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1))
   - Rounded corners (8px or 12px)
   - Border on hover

3. **Inputs**
   - Clean, modern design
   - Focus ring with primary color
   - Error state with red border
   - Helper text below input

4. **Modals**
   - Backdrop blur effect
   - Smooth fade-in animation
   - Close on backdrop click (optional)
   - Escape key to close

---

## User Flow

### Flow 1: First-time User
1. User lands on page
2. Sees upload zone with clear instructions
3. Drags PDF file or clicks to browse
4. File appears with preview
5. User clicks "Extract Tables"
6. Progress animation shows processing steps
7. Success message appears with summary
8. User clicks "View Excel" to see results
9. User reviews tables in Excel viewer
10. User optionally makes edits
11. User clicks "Download Excel"
12. File downloads successfully

### Flow 2: Returning User
1. User lands on page
2. Sees "Recent Files" section (if implemented)
3. Clicks on previously processed file
4. Excel viewer opens directly
5. User makes edits
6. User downloads updated file

---

## Accessibility (WCAG 2.1 AA)

- Keyboard navigation throughout
- ARIA labels for all interactive elements
- Focus indicators on all focusable elements
- Screen reader support
- Color contrast ratio ≥ 4.5:1
- Alt text for icons and images
- Skip to main content link
- Clear error messages with context

---

## Responsive Design

### Mobile (< 640px)
- Single column layout
- Full-width upload zone
- Stacked buttons
- Excel viewer with horizontal scroll only
- Simplified toolbar

### Tablet (640px - 1024px)
- Two-column layout where appropriate
- Medium upload zone
- Side-by-side buttons
- Excel viewer with reduced features

### Desktop (> 1024px)
- Multi-column layout
- Large upload zone
- Full feature set
- Optimal Excel viewer experience

---

## Performance Requirements

- Initial page load: < 2 seconds
- File upload: Progress indicator for all uploads
- Processing: Real-time updates, no browser freeze
- Excel viewer: Smooth scrolling, no lag with 200+ rows
- Animations: 60fps, smooth transitions

---

## Backend Integration

### API Endpoints to Create

1. **POST /api/upload-pdf**
   - Accepts PDF file
   - Validates file
   - Returns upload ID
   - Starts processing

2. **GET /api/progress/{uploadId}**
   - Returns current processing progress
   - Returns current stage and percentage

3. **GET /api/download/{uploadId}**
   - Returns Excel file for download
   - Supports range requests for large files

4. **GET /api/excel-data/{uploadId}**
   - Returns Excel data as JSON for viewer
   - Supports pagination for large workbooks
   - Returns sheet names and cell data

5. **POST /api/save-excel/{uploadId}**
   - Accepts modified Excel data
   - Saves updated workbook
   - Returns updated file for download

6. **WebSocket /api/ws/{uploadId}**
   - Real-time progress updates
   - Pushes processing stages
   - Sends completion notification

---

## Component Structure

```
src/
├── app/
│   ├── page.tsx                 # Main page
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── UploadZone.tsx           # Drag & drop upload
│   ├── ProgressBar.tsx           # Processing progress
│   ├── SuccessCard.tsx          # Success summary
│   ├── ErrorCard.tsx            # Error display
│   ├── ExcelViewer.tsx          # Main Excel viewer modal
│   ├── SheetTabs.tsx            # Sheet navigation tabs
│   ├── Spreadsheet.tsx           # Data grid component
│   ├── DownloadButton.tsx        # Download action
│   ├── ProcessingSteps.tsx       # Step-by-step progress
│   └── RecentFiles.tsx          # History (optional)
├── hooks/
│   ├── useFileUpload.ts         # Upload logic
│   ├── usePdfProcessing.ts     # Processing state
│   └── useExcelViewer.ts       # Viewer logic
├── lib/
│   └── api.ts                 # API client functions
└── types/
    └── index.ts               # TypeScript types
```

---

## States & Transitions

### Application States
```
Initial → Uploading → Processing → Success
                    ↓                    ↓
                   Error ←---------------↓
                                          ↓
                                  Excel Viewer (Optional)
                                          ↓
                                    Downloaded
```

### Loading States
- Initial page load: Skeleton screens
- File upload: Progress bar with percentage
- PDF processing: Animated spinner with steps
- Excel rendering: Skeleton grid then populated

---

## Error Handling

### User Errors
1. **Invalid File Type**
   - Clear message: "Please upload a PDF file"
   - Show accepted formats
   - Provide link to file converter if needed

2. **File Too Large**
   - Message: "File size exceeds 50MB limit"
   - Show current size and limit
   - Suggest splitting file

3. **Corrupted PDF**
   - Message: "Unable to read PDF file"
   - Suggest re-downloading PDF
   - Provide contact support link

### System Errors
1. **Processing Failed**
   - Message: "Processing encountered an error"
   - Show error code
   - Retry button
   - Report issue button

2. **Download Failed**
   - Message: "Unable to download file"
   - Retry button
   - Alternative download method

---

## Analytics & Monitoring

### Track Events
- Page view
- File upload (size, duration)
- Processing time
- Download initiated
- Download completed
- Excel viewer opened
- Sheet viewed (which sheets, duration)
- Errors encountered

### Performance Metrics
- Page load time
- Upload speed
- Processing duration
- Excel render time
- Download speed

---

## Security Considerations

1. **File Validation**
   - Server-side MIME type check
   - File size limits
   - Virus scanning (if applicable)
   - Rate limiting per user

2. **Data Privacy**
   - Clear data retention policy
   - Files deleted after X hours
   - HTTPS only
   - No logging of sensitive data

3. **CSRF Protection**
   - Token-based API requests
   - SameSite cookie attributes

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Mockups / Wireframes

### Upload Screen Mockup
```
┌─────────────────────────────────────────────┐
│  PDF to Excel Table Extractor           │
│  Extract all tables from PDF files        │
│                                        │
│  ┌────────────────────────────────────┐   │
│  │                                │   │
│  │    📄                           │   │
│  │                                │   │
│  │  Drag & Drop PDF file here       │   │
│  │                                │   │
│  │  or Click to Browse             │   │
│  │                                │   │
│  │  Supported: PDF (Max: 50MB)     │   │
│  │                                │   │
│  └────────────────────────────────────┘   │
│                                        │
│  Recent Files:                          │
│  • report.pdf  (Processed 2h ago)      │
│  • q3_data.pdf (Processed yesterday)   │
└─────────────────────────────────────────────┘
```

### Processing Screen Mockup
```
┌─────────────────────────────────────────────┐
│  Processing PDF...                      │
│                                        │
│         [██████████░░░░░] 65%         │
│                                        │
│  ✓ Upload file (10%)                   │
│  ✓ Read PDF (20%)                      │
│  ✓ Detect tables (50%)                  │
│  ▸ Extract tables... (65%)              │
│  ⬜ Create Excel (80%)                  │
│  ⬜ Format sheets (100%)                │
│                                        │
│  Tables detected: 193                    │
│  Pages scanned: 89/159                   │
│  Estimated time: 45s                    │
│                                        │
│  [Cancel]                              │
└─────────────────────────────────────────────┘
```

### Success Screen Mockup
```
┌─────────────────────────────────────────────┐
│  ✓ Processing Complete!                 │
│                                        │
│  ┌────────────────────────────────────┐   │
│  │  Summary                        │   │
│  │  • Tables extracted: 193        │   │
│  │  • Sheets created: 193          │   │
│  │  • File size: 669 KB           │   │
│  │  • Processing time: 2.5 min     │   │
│  └────────────────────────────────────┘   │
│                                        │
│  ┌──────────────────┬──────────────────┐ │
│  │   View Excel   │  Download Excel │ │
│  │   [Large]      │   [Secondary]   │ │
│  └──────────────────┴──────────────────┘ │
│                                        │
│  [Upload New PDF]                       │
└─────────────────────────────────────────────┘
```

### Excel Viewer Mockup
```
┌─────────────────────────────────────────────────┐
│  Excel Viewer - report_Tables.xlsx     [X] │
├─────────────────────────────────────────────────┤
│ [Table_1] [Table_2] [Table_3] ...       │
│ [🔍 Search...]                           │
├─────────────────────────────────────────────────┤
│ [✏️ Edit] [↩️ Undo] [➕ Row] [➕ Col]    │
├─────────────────────────────────────────────────┤
│  ┌─────┬──────┬───────┬──────┬────────┐│
│  │  A  │  B   │   C   │   D   │    E   ││
│  ├─────┼──────┼───────┼──────┼────────┤│
│ 1│ Sr  │ Form │ Descr │ Page  │        ││
│  │ No. │ No.  │ iption│ No.   │        ││
│  ├─────┼──────┼───────┼──────┼────────┤│
│ 2│ 1-20│ L-1  │ Reven │ 1-4   │        ││
│  │     │ ...  │ ue    │       │        ││
│  ├─────┼──────┼───────┼──────┼────────┤│
│ 3│     │      │       │       │        ││
│  └─────┴──────┴───────┴──────┴────────┘│
│                                         │
│  Showing 2 rows × 4 columns              │
│  [← Prev] [Next →]  [Save] [Download] │
└─────────────────────────────────────────────────┘
```

---

## Implementation Priorities

### Phase 1 (MVP)
1. Basic file upload with drag-and-drop
2. PDF processing with progress bar
3. Success screen with download button
4. Basic Excel viewer (read-only)

### Phase 2
1. Excel viewer with editing capabilities
2. Sheet navigation
3. Search/filter functionality
4. Recent files history

### Phase 3
1. Advanced editing (formulas, formatting)
2. Export to multiple formats
3. Share functionality
4. Offline support (PWA)

---

## Additional Features (Nice to Have)

1. **Batch Upload**
   - Upload multiple PDFs at once
   - Queue processing
   - Progress per file

2. **File Preview**
   - Show first page of PDF before upload
   - Table detection preview

3. **Templates**
   - Save frequently used settings
   - Pre-defined output formats

4. **API Integration**
   - Export to Google Sheets
   - Import from cloud storage

5. **Collaboration**
   - Real-time collaborative editing
   - Shareable links
   - Comment system

---

## Deliverables

1. **Working Next.js 15 Application**
   - Fully functional UI
   - All required features implemented
   - Responsive design

2. **Component Library**
   - Reusable UI components
   - Well-documented API
   - Storybook (optional)

3. **Documentation**
   - Setup instructions
   - Deployment guide
   - API documentation
   - User guide

4. **Tests**
   - Unit tests for components
   - Integration tests for flows
   - E2E tests with Playwright

---

## Success Criteria

- ✅ Users can upload PDF files easily
- ✅ Processing shows clear, real-time progress
- ✅ Excel files are generated accurately
- ✅ Excel viewer is responsive and smooth
- ✅ Users can edit cells and save changes
- ✅ Download works reliably
- ✅ UI is accessible and responsive
- ✅ Performance meets requirements
- ✅ Error handling is clear and helpful

---

## Next Steps

1. Review this prompt and clarify requirements
2. Set up Next.js 15 project with TypeScript
3. Install shadcn/ui and required dependencies
4. Implement components in priority order
5. Test each feature thoroughly
6. Deploy and gather user feedback
7. Iterate based on feedback

---

## Notes for Developer

- Start with MVP and iterate
- Use modern React patterns (hooks, context, etc.)
- Implement proper error boundaries
- Consider using a state management library for complex state
- Optimize for performance from the start
- Write clean, maintainable code
- Add comments for complex logic
- Use TypeScript strictly for type safety
- Follow accessibility best practices
- Test on multiple browsers and devices

---

## Resources & References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Data Grid](https://www.ag-grid.com/react-data-grid)
- [Handsontable](https://handsontable.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PDF.js](https://mozilla.github.io/pdf.js/) - For PDF preview (if needed)
- [SheetJS (ExcelJS)](https://docs.sheetjs.com/) - For Excel parsing
- [React Dropzone](https://react-dropzone.js.org/)

---

**End of Prompt**
