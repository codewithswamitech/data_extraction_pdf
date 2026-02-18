import { AlertCircle, RefreshCcw, FileUp, CheckCircle2, FileText } from 'lucide-react';
import type { ErrorInfo } from '../types';
import './ErrorView.css';

interface Props {
    error: ErrorInfo;
    onRetry: () => void;
    onUploadNew: () => void;
}

export default function ErrorView({ error, onRetry, onUploadNew }: Props) {
    return (
        <div className="error-page">
            {/* Header */}
            <div className="error-header">
                <FileText size={20} className="error-header-icon" />
                <span className="error-header-title">PDF Extractor</span>
            </div>

            {/* Red top bar */}
            <div className="error-top-bar" />

            {/* Decorative background */}
            <div className="error-bg-doc" />

            <div className="error-container animate-fade-in-up">
                <div className="error-card card">
                    {/* Error icon */}
                    <div className="error-icon-wrapper">
                        <AlertCircle size={36} />
                    </div>

                    <h1 className="error-title">{error.title}</h1>

                    <div className="error-code-badge">
                        <code>ERROR_CODE: {error.code}</code>
                    </div>

                    {/* Error message */}
                    <div className="error-message-box">
                        <p>{error.message}</p>
                    </div>

                    {/* Troubleshooting */}
                    <div className="error-tips">
                        <h3 className="tips-title">
                            💡 Troubleshooting Tips
                        </h3>
                        <ul className="tips-list">
                            {error.tips.map((tip, i) => (
                                <li key={i} className="tip-item">
                                    <CheckCircle2 size={16} className="tip-check" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="error-divider" />

                    {/* Action buttons */}
                    <div className="error-actions">
                        <button className="btn btn-primary btn-lg error-retry-btn" onClick={onRetry}>
                            <RefreshCcw size={18} /> Retry Processing
                        </button>
                        <button className="btn btn-secondary btn-lg error-upload-btn" onClick={onUploadNew}>
                            <FileUp size={18} /> Upload New File
                        </button>
                    </div>
                </div>

                <p className="error-support">
                    Still having trouble? <a href="#support">Contact Support</a> or <a href="#docs">Read Docs</a>
                </p>
            </div>
        </div>
    );
}
