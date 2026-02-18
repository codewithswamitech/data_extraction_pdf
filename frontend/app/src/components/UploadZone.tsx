import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Upload,
    FileText,
    Shield,
    Clock,
    HardDrive,
    Zap,
    LayoutList,
    ShieldCheck,
    Eye,
    Download,
    Trash2,
    Grid3X3,
} from 'lucide-react';
import type { RecentFile } from '../types';
import { MOCK_RECENT_FILES } from '../mockData';
import './UploadZone.css';

interface Props {
    onFileAccepted: (file: File, simulateError: boolean) => void;
}

export default function UploadZone({ onFileAccepted }: Props) {
    const [recentFiles, setRecentFiles] = useState<RecentFile[]>(MOCK_RECENT_FILES);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                // Hold Shift while dropping to simulate error (for demo)
                onFileAccepted(file, false);
            }
        },
        [onFileAccepted]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 25 * 1024 * 1024, // 25MB
        multiple: false,
    });

    const handleClearHistory = () => {
        setRecentFiles([]);
    };

    return (
        <div className="upload-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container navbar-inner">
                    <div className="navbar-brand">
                        <Grid3X3 size={22} className="navbar-logo-icon" />
                        <span className="navbar-title">
                            Table<strong>Extract</strong>
                        </span>
                    </div>
                    <div className="navbar-links">
                        <a href="#how-it-works">How it works</a>
                        <a href="#templates">Templates</a>
                        <a href="#pricing">Pricing</a>
                        <button className="btn btn-sm btn-primary navbar-signin">Sign In</button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero animate-fade-in-up">
                <div className="container">
                    <h1 className="hero-title">Extract Tables from PDF</h1>
                    <p className="hero-subtitle">
                        Instantly turn your PDF invoices, reports, and bank statements into editable
                        Excel spreadsheets with AI-powered structure detection.
                    </p>
                </div>
            </section>

            {/* Upload Zone */}
            <section className="upload-section container">
                <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'dropzone--active' : ''} ${isDragReject ? 'dropzone--reject' : ''}`}
                >
                    <input {...getInputProps()} />
                    <div className="dropzone-content animate-fade-in-up">
                        <div className="dropzone-icon">
                            <Upload size={28} strokeWidth={1.8} />
                        </div>
                        <h2 className="dropzone-title">Drag & Drop PDF file here</h2>
                        <p className="dropzone-subtitle">or select a file from your computer</p>
                        <button
                            className="btn btn-md btn-primary dropzone-browse"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Click to Browse
                        </button>
                        <div className="dropzone-meta">
                            <span className="meta-item">
                                <Shield size={14} /> 256-bit Encryption
                            </span>
                            <span className="meta-item">
                                <Clock size={14} /> Auto-delete after 24h
                            </span>
                            <span className="meta-item">
                                <HardDrive size={14} /> Max size 25MB
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Files */}
            {recentFiles.length > 0 && (
                <section className="recent-section container animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <div className="recent-header">
                        <h3 className="recent-title">
                            <Clock size={18} /> Recent Files
                        </h3>
                        <button className="btn btn-ghost btn-sm" onClick={handleClearHistory}>
                            Clear History
                        </button>
                    </div>
                    <div className="recent-table card">
                        <div className="recent-table-header">
                            <span>FILENAME</span>
                            <span>TABLES FOUND</span>
                            <span>SIZE</span>
                            <span>PROCESSED</span>
                            <span>ACTIONS</span>
                        </div>
                        {recentFiles.map((file) => (
                            <div key={file.id} className="recent-table-row">
                                <span className="recent-filename">
                                    <FileText size={16} className="pdf-icon" />
                                    {file.fileName}
                                </span>
                                <span>
                                    <span className="badge badge-primary">{file.tablesFound} Tables</span>
                                </span>
                                <span className="text-muted">{file.fileSize}</span>
                                <span className="text-muted">{file.processedAt}</span>
                                <span className="recent-actions">
                                    <button className="btn btn-ghost btn-sm" title="View">
                                        <Eye size={16} />
                                    </button>
                                    <button className="btn btn-secondary btn-sm">
                                        <Download size={14} /> Excel
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Features */}
            <section className="features-section container animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon feature-icon--zap">
                            <Zap size={22} />
                        </div>
                        <h4 className="feature-title">Instant OCR</h4>
                        <p className="feature-desc">
                            Advanced recognition technology handles scanned documents with high accuracy.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon feature-icon--list">
                            <LayoutList size={22} />
                        </div>
                        <h4 className="feature-title">Structure Preservation</h4>
                        <p className="feature-desc">
                            Keeps merged cells, formatting, and data types consistent with the original.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon feature-icon--shield">
                            <ShieldCheck size={22} />
                        </div>
                        <h4 className="feature-title">Private & Secure</h4>
                        <p className="feature-desc">
                            Files are processed in a sandbox and deleted automatically after extraction.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-inner">
                    <div className="footer-brand">
                        <Grid3X3 size={16} />
                        <span>TableExtract</span>
                    </div>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#support">Contact Support</a>
                    </div>
                    <p className="footer-copy">© 2024 TableExtract AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
