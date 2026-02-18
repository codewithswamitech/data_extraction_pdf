import { useState } from 'react';
import { X, FileText, Check, Download, Shield } from 'lucide-react';
import './DownloadModal.css';

interface Props {
    fileName: string;
    fileSize: string;
    tablesCount: number;
    onClose: () => void;
    onDownload: () => void;
}

type DownloadFormat = 'xlsx' | 'csv' | 'pdf';
type DownloadScope = 'all' | 'current';

export default function DownloadModal({
    fileName,
    fileSize,
    tablesCount,
    onClose,
    onDownload,
}: Props) {
    const [format, setFormat] = useState<DownloadFormat>('xlsx');
    const [scope, setScope] = useState<DownloadScope>('all');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card card animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Download Options</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* File info */}
                <div className="modal-file-info">
                    <div className="modal-file-icon">
                        <FileText size={22} />
                    </div>
                    <div className="modal-file-details">
                        <p className="modal-file-name">{fileName}</p>
                        <p className="modal-file-meta">
                            File Size: {fileSize} | {tablesCount} Tables Extracted
                        </p>
                    </div>
                </div>

                {/* Scope selection */}
                <div className="modal-section">
                    <h3 className="modal-section-title">Select Scope</h3>
                    <label className="modal-radio">
                        <input
                            type="radio"
                            name="scope"
                            checked={scope === 'all'}
                            onChange={() => setScope('all')}
                        />
                        <span className={`radio-custom ${scope === 'all' ? 'radio-custom--active' : ''}`}>
                            {scope === 'all' && <Check size={14} />}
                        </span>
                        <span>Include all sheets</span>
                    </label>
                    <label className="modal-radio">
                        <input
                            type="radio"
                            name="scope"
                            checked={scope === 'current'}
                            onChange={() => setScope('current')}
                        />
                        <span className={`radio-custom ${scope === 'current' ? 'radio-custom--active' : ''}`}>
                            {scope === 'current' && <Check size={14} />}
                        </span>
                        <span>Download current sheet only</span>
                    </label>
                </div>

                {/* Format selection */}
                <div className="modal-section">
                    <h3 className="modal-section-title">Choose Format</h3>
                    <div className="format-options">
                        {([
                            { id: 'xlsx' as DownloadFormat, label: '.xlsx', sub: 'Excel' },
                            { id: 'csv' as DownloadFormat, label: '.csv', sub: 'Comma Split' },
                            { id: 'pdf' as DownloadFormat, label: '.pdf', sub: 'Portable' },
                        ]).map((f) => (
                            <button
                                key={f.id}
                                className={`format-option ${format === f.id ? 'format-option--active' : ''}`}
                                onClick={() => setFormat(f.id)}
                            >
                                {format === f.id && (
                                    <span className="format-check">
                                        <Check size={12} />
                                    </span>
                                )}
                                <span className="format-label">{f.label}</span>
                                <span className="format-sub">{f.sub}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Download button */}
                <button className="btn btn-primary btn-xl modal-download-btn" onClick={onDownload}>
                    <Download size={18} /> Download Now
                </button>

                <button className="modal-cancel-link" onClick={onClose}>
                    Cancel
                </button>

                {/* Trust */}
                <div className="modal-trust">
                    <Shield size={14} />
                    <span>SECURE ENCRYPTED DOWNLOAD</span>
                </div>
            </div>
        </div>
    );
}
