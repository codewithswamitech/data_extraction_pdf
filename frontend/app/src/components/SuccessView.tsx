import { CheckCircle, Eye, Download, PlusCircle, Grid3X3, FileSpreadsheet, Layers, FileText, Clock } from 'lucide-react';
import type { ExtractionSummary } from '../types';
import './SuccessView.css';

interface Props {
    summary: ExtractionSummary;
    onViewExcel: () => void;
    onDownload: () => void;
    onUploadNew: () => void;
}

export default function SuccessView({ summary, onViewExcel, onDownload, onUploadNew }: Props) {
    return (
        <div className="success-page">
            {/* Background gradient */}
            <div className="success-bg" />

            <div className="success-container animate-fade-in-up">
                {/* Checkmark */}
                <div className="success-checkmark animate-checkmark">
                    <CheckCircle size={48} strokeWidth={1.8} />
                </div>

                <h1 className="success-title">Processing Complete!</h1>
                <p className="success-subtitle">Your document has been successfully converted to Excel format.</p>

                {/* Summary card */}
                <div className="summary-card card">
                    <h3 className="summary-label">EXTRACTION SUMMARY</h3>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <div className="summary-icon summary-icon--tables">
                                <Grid3X3 size={20} />
                            </div>
                            <div>
                                <span className="summary-item-label">Tables Extracted</span>
                                <span className="summary-item-value">{summary.tablesExtracted}</span>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon summary-icon--sheets">
                                <Layers size={20} />
                            </div>
                            <div>
                                <span className="summary-item-label">Sheets Created</span>
                                <span className="summary-item-value">{summary.sheetsCreated}</span>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon summary-icon--size">
                                <FileText size={20} />
                            </div>
                            <div>
                                <span className="summary-item-label">File Size</span>
                                <span className="summary-item-value">{summary.fileSize}</span>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon summary-icon--time">
                                <Clock size={20} />
                            </div>
                            <div>
                                <span className="summary-item-label">Processing Time</span>
                                <span className="summary-item-value">{summary.processingTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="success-actions stagger-children">
                    <button className="btn btn-primary btn-xl" onClick={onViewExcel}>
                        <Eye size={20} /> View Excel Online
                    </button>
                    <button className="btn btn-secondary btn-xl" onClick={onDownload}>
                        <Download size={20} /> Download Spreadsheet
                    </button>
                </div>

                <button className="btn btn-ghost btn-md upload-new-btn" onClick={onUploadNew}>
                    <PlusCircle size={16} /> Upload New PDF
                </button>
            </div>
        </div>
    );
}
