import { CheckCircle, Loader, XCircle, Grid3X3, User, Shield, Sparkles, CloudUpload } from 'lucide-react';
import type { ProcessingState } from '../types';
import './ProcessingView.css';

interface Props {
    state: ProcessingState;
    fileName: string;
    onCancel: () => void;
}

export default function ProcessingView({ state, fileName, onCancel }: Props) {
    return (
        <div className="processing-page">
            {/* Navbar */}
            <nav className="proc-navbar">
                <div className="container proc-navbar-inner">
                    <div className="navbar-brand">
                        <Grid3X3 size={20} className="navbar-logo-icon" />
                        <span className="navbar-title">Tabula<strong>X</strong></span>
                    </div>
                    <div className="proc-navbar-right">
                        <span className="proc-filename">Project: {fileName}</span>
                        <button className="proc-avatar" title="Account">
                            <User size={16} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Decorative background */}
            <div className="proc-bg-decoration" />

            {/* Main content */}
            <div className="processing-container animate-fade-in-up">
                <div className="processing-card card">
                    <h1 className="processing-title">Extracting Your Data</h1>
                    <p className="processing-subtitle">Please keep this tab open while we process your document.</p>

                    {/* Progress bar */}
                    <div className="progress-section">
                        <div className="progress-header">
                            <span className="progress-label">OVERALL PROGRESS</span>
                            <span className="progress-percent">{state.progress}%</span>
                        </div>
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${state.progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Stages */}
                    <div className="stages-list stagger-children">
                        {state.stages.map((stage) => (
                            <div
                                key={stage.id}
                                className={`stage-item stage-item--${stage.status}`}
                            >
                                <div className="stage-icon">
                                    {stage.status === 'completed' && (
                                        <CheckCircle size={20} className="stage-check" />
                                    )}
                                    {stage.status === 'active' && (
                                        <Loader size={20} className="stage-spinner animate-spin" />
                                    )}
                                    {stage.status === 'pending' && (
                                        <div className="stage-dot" />
                                    )}
                                </div>
                                <div className="stage-content">
                                    <span className="stage-label">{stage.label}</span>
                                    {stage.status === 'active' && (
                                        <>
                                            <span className="badge badge-primary stage-badge">Active</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Active stage detail card */}
                        {state.stages.find((s) => s.status === 'active') && (
                            <div className="active-stage-card">
                                <div className="active-stage-info">
                                    <Loader size={18} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                                    <div>
                                        <p className="active-stage-title" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                                            {state.stages.find((s) => s.status === 'active')?.label}
                                        </p>
                                        <p className="active-stage-detail">
                                            Processing structures and formatting cell data.
                                        </p>
                                    </div>
                                </div>
                                <p className="active-stage-counter">
                                    <strong>{state.pagesScanned}</strong>
                                    <span className="text-muted"> / {state.totalPages}</span>
                                    <span className="counter-label"> PAGES</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Stats row */}
                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="stat-label">TOTAL PAGES</span>
                            <span className="stat-value">{state.totalPages}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-box">
                            <span className="stat-label">TABLES FOUND</span>
                            <span className="stat-value">{state.tablesFound}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-box">
                            <span className="stat-label">EST. REMAINING</span>
                            <span className="stat-value stat-value--highlight">{state.estimatedRemaining}</span>
                        </div>
                    </div>

                    {/* Cancel */}
                    <div className="processing-actions">
                        <button className="btn btn-secondary btn-md" onClick={onCancel}>
                            <XCircle size={16} /> Cancel Processing
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom trust badges */}
            <div className="trust-badges animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="trust-badge">
                    <Shield size={14} /> END-TO-END ENCRYPTED
                </span>
                <span className="trust-badge">
                    <Sparkles size={14} /> AI-POWERED ACCURACY
                </span>
                <span className="trust-badge">
                    <CloudUpload size={14} /> AUTO-SAVE ENABLED
                </span>
            </div>
        </div>
    );
}
