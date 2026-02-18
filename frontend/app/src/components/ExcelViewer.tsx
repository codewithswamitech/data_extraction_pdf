import { useState, useCallback, useRef, useEffect } from 'react';
import {
    Grid3X3,
    Search,
    ToggleLeft,
    ToggleRight,
    Undo2,
    Redo2,
    Plus,
    Columns3,
    ChevronLeft,
    ChevronRight,
    Save,
    Download,
    X,
} from 'lucide-react';
import type { ExcelData, CellData } from '../types';
import DownloadModal from './DownloadModal';
import './ExcelViewer.css';

interface Props {
    data: ExcelData;
    onBack: () => void;
    onDownload: () => void;
}

export default function ExcelViewer({ data, onBack }: Props) {
    const [activeSheet, setActiveSheet] = useState(0);
    const [editMode, setEditMode] = useState(true);
    const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
    const [sheets, setSheets] = useState(data.sheets);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [undoStack, setUndoStack] = useState<string[][][]>([]);
    const [autoSaveTime, setAutoSaveTime] = useState('');
    const editInputRef = useRef<HTMLInputElement>(null);

    const currentSheet = sheets[activeSheet];

    // Update auto-save time
    useEffect(() => {
        const now = new Date();
        setAutoSaveTime(
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
        );
    }, [sheets]);

    // Focus input when editing
    useEffect(() => {
        if (editingCell && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingCell]);

    const handleCellClick = useCallback(
        (rowIdx: number, colIdx: number) => {
            if (!editMode) return;
            setEditingCell({ row: rowIdx, col: colIdx });
        },
        [editMode]
    );

    const handleCellChange = useCallback(
        (rowIdx: number, colIdx: number, value: string) => {
            // Save current state for undo
            const currentValues = sheets[activeSheet].rows.map((row) =>
                row.map((cell) => cell.value)
            );
            setUndoStack((prev) => [...prev, currentValues]);

            setSheets((prev) =>
                prev.map((sheet, si) => {
                    if (si !== activeSheet) return sheet;
                    return {
                        ...sheet,
                        rows: sheet.rows.map((row, ri) =>
                            row.map((cell, ci) => {
                                if (ri === rowIdx && ci === colIdx) {
                                    return { ...cell, value };
                                }
                                return cell;
                            })
                        ),
                    };
                })
            );
        },
        [activeSheet, sheets]
    );

    const handleCellBlur = useCallback(() => {
        setEditingCell(null);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent, rowIdx: number, colIdx: number) => {
            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                setEditingCell(null);
                // Move to next cell
                if (e.key === 'Tab') {
                    const nextCol = colIdx + 1;
                    if (nextCol < currentSheet.columns.length) {
                        setEditingCell({ row: rowIdx, col: nextCol });
                    }
                } else {
                    const nextRow = rowIdx + 1;
                    if (nextRow < currentSheet.rows.length) {
                        setEditingCell({ row: nextRow, col: colIdx });
                    }
                }
            }
            if (e.key === 'Escape') {
                setEditingCell(null);
            }
        },
        [currentSheet]
    );

    const handleUndo = useCallback(() => {
        if (undoStack.length === 0) return;
        const prevValues = undoStack[undoStack.length - 1];
        setUndoStack((prev) => prev.slice(0, -1));
        setSheets((prev) =>
            prev.map((sheet, si) => {
                if (si !== activeSheet) return sheet;
                return {
                    ...sheet,
                    rows: sheet.rows.map((row, ri) =>
                        row.map((cell, ci) => ({
                            ...cell,
                            value: prevValues[ri]?.[ci] ?? cell.value,
                        }))
                    ),
                };
            })
        );
    }, [undoStack, activeSheet]);

    const handleAddRow = useCallback(() => {
        setSheets((prev) =>
            prev.map((sheet, si) => {
                if (si !== activeSheet) return sheet;
                const newRow: CellData[] = sheet.columns.map(() => ({ value: '' }));
                return { ...sheet, rows: [...sheet.rows, newRow] };
            })
        );
    }, [activeSheet]);

    const handleAddColumn = useCallback(() => {
        setSheets((prev) =>
            prev.map((sheet, si) => {
                if (si !== activeSheet) return sheet;
                const colLetter = String.fromCharCode(65 + sheet.columns.length);
                return {
                    ...sheet,
                    columns: [...sheet.columns, colLetter],
                    rows: sheet.rows.map((row) => [...row, { value: '' }]),
                };
            })
        );
    }, [activeSheet]);

    const getStatusBadge = (value: string) => {
        const v = value.toUpperCase();
        if (v === 'PAID') return <span className="cell-badge cell-badge--paid">PAID</span>;
        if (v === 'PENDING') return <span className="cell-badge cell-badge--pending">PENDING</span>;
        return null;
    };

    const selectedCellRef =
        editingCell
            ? `${String.fromCharCode(65 + editingCell.col)}${editingCell.row + 1}`
            : '';
    const selectedCellValue =
        editingCell
            ? currentSheet.rows[editingCell.row]?.[editingCell.col]?.value ?? ''
            : '';

    return (
        <div className="excel-viewer">
            {/* Header */}
            <header className="ev-header">
                <div className="ev-header-left">
                    <div className="ev-logo">
                        <Grid3X3 size={20} />
                    </div>
                    <div className="ev-header-info">
                        <h1 className="ev-title">Extracted Tables</h1>
                        <p className="ev-subtitle">Review and edit your data before export</p>
                    </div>
                </div>
                <div className="ev-header-right">
                    <div className="ev-search">
                        <Search size={16} className="ev-search-icon" />
                        <input
                            type="text"
                            placeholder={`Search in ${currentSheet.name}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ev-search-input"
                        />
                    </div>
                </div>
            </header>

            {/* Sheet tabs */}
            <div className="ev-tabs">
                <div className="ev-tabs-scroll">
                    {sheets.map((sheet, i) => (
                        <button
                            key={i}
                            className={`ev-tab ${i === activeSheet ? 'ev-tab--active' : ''}`}
                            onClick={() => {
                                setActiveSheet(i);
                                setEditingCell(null);
                            }}
                        >
                            <Grid3X3 size={14} />
                            {sheet.name}
                        </button>
                    ))}
                    <button className="ev-tab ev-tab--add" title="Add sheet">
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="ev-toolbar">
                <div className="ev-toolbar-left">
                    <button
                        className={`ev-toggle ${editMode ? 'ev-toggle--on' : ''}`}
                        onClick={() => {
                            setEditMode(!editMode);
                            setEditingCell(null);
                        }}
                    >
                        {editMode ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                        <span>EDIT MODE</span>
                    </button>

                    <div className="ev-toolbar-divider" />

                    <button className="ev-tool-btn" onClick={handleUndo} title="Undo" disabled={undoStack.length === 0}>
                        <Undo2 size={16} />
                    </button>
                    <button className="ev-tool-btn" title="Redo" disabled>
                        <Redo2 size={16} />
                    </button>

                    <div className="ev-toolbar-divider" />

                    <button className="ev-tool-btn ev-tool-btn--label" onClick={handleAddRow}>
                        <Plus size={14} /> Add Row
                    </button>
                    <button className="ev-tool-btn ev-tool-btn--label" onClick={handleAddColumn}>
                        <Columns3 size={14} /> Add Column
                    </button>
                </div>
                <div className="ev-toolbar-right">
                    {autoSaveTime && (
                        <span className="ev-autosave">Auto-saved at {autoSaveTime}</span>
                    )}
                </div>
            </div>

            {/* Formula / cell reference bar */}
            {editMode && editingCell && (
                <div className="ev-formula-bar">
                    <span className="ev-cell-ref">{selectedCellRef}</span>
                    <span className="ev-formula-icon">Σ</span>
                    <span className="ev-formula-value">{selectedCellValue}</span>
                </div>
            )}

            {/* Spreadsheet grid */}
            <div className="ev-grid-wrapper">
                <table className="ev-table">
                    <thead>
                        <tr>
                            <th className="ev-row-num-header" />
                            {currentSheet.columns.map((col, i) => (
                                <th key={i} className="ev-col-header">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentSheet.rows.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className={`ev-row ${rowIdx % 2 === 0 ? 'ev-row--even' : 'ev-row--odd'}`}
                            >
                                <td className="ev-row-num">{rowIdx + 1}</td>
                                {row.map((cell, colIdx) => {
                                    const isEditing =
                                        editingCell?.row === rowIdx && editingCell?.col === colIdx;
                                    const badge = getStatusBadge(cell.value);
                                    return (
                                        <td
                                            key={colIdx}
                                            className={`ev-cell ${isEditing ? 'ev-cell--editing' : ''} ${editingCell?.row === rowIdx || editingCell?.col === colIdx ? 'ev-cell--highlight' : ''}`}
                                            onClick={() => handleCellClick(rowIdx, colIdx)}
                                        >
                                            {isEditing ? (
                                                <input
                                                    ref={editInputRef}
                                                    className="ev-cell-input"
                                                    value={cell.value}
                                                    onChange={(e) =>
                                                        handleCellChange(rowIdx, colIdx, e.target.value)
                                                    }
                                                    onBlur={handleCellBlur}
                                                    onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                                                />
                                            ) : badge ? (
                                                badge
                                            ) : (
                                                <span className="ev-cell-text">{cell.value}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        {/* Empty rows for spreadsheet feel */}
                        {Array.from({ length: Math.max(0, 12 - currentSheet.rows.length) }).map(
                            (_, i) => (
                                <tr key={`empty-${i}`} className="ev-row ev-row--empty">
                                    <td className="ev-row-num">{currentSheet.rows.length + i + 1}</td>
                                    {currentSheet.columns.map((_, ci) => (
                                        <td key={ci} className="ev-cell" />
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <footer className="ev-footer">
                <div className="ev-footer-left">
                    <button
                        className="ev-nav-btn"
                        disabled={activeSheet === 0}
                        onClick={() => { setActiveSheet((p) => p - 1); setEditingCell(null); }}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="ev-sheet-info">
                        Sheet {activeSheet + 1} of {sheets.length}
                    </span>
                    <button
                        className="ev-nav-btn"
                        disabled={activeSheet === sheets.length - 1}
                        onClick={() => { setActiveSheet((p) => p + 1); setEditingCell(null); }}
                    >
                        <ChevronRight size={16} />
                    </button>
                    <span className="ev-rows-info">
                        Showing {currentSheet.rows.length} of {currentSheet.rows.length * 6} rows extracted
                    </span>
                </div>
                <div className="ev-footer-right">
                    <button className="btn btn-ghost btn-md" onClick={onBack}>
                        Discard Changes
                    </button>
                    <button className="btn btn-secondary btn-md">
                        <Save size={16} /> Save Changes
                    </button>
                    <button
                        className="btn btn-primary btn-md"
                        onClick={() => setShowDownloadModal(true)}
                    >
                        <Download size={16} /> Download .xlsx
                    </button>
                </div>
            </footer>

            {/* Download Modal */}
            {showDownloadModal && (
                <DownloadModal
                    fileName={data.fileName}
                    fileSize="1.2 MB"
                    tablesCount={sheets.length}
                    onClose={() => setShowDownloadModal(false)}
                    onDownload={() => {
                        setShowDownloadModal(false);
                        /* Future: trigger FastAPI download */
                    }}
                />
            )}
        </div>
    );
}
