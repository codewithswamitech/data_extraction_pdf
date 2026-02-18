import { useState, useCallback } from 'react';
import type {
    AppView,
    UploadedFile,
    ProcessingState,
    ExtractionSummary,
    ExcelData,
    ErrorInfo,
} from './types';
import {
    MOCK_SUMMARY,
    MOCK_EXCEL_DATA,
    MOCK_ERROR,
    createInitialProcessingState,
    simulateProcessing,
} from './mockData';
import UploadZone from './components/UploadZone';
import ProcessingView from './components/ProcessingView';
import SuccessView from './components/SuccessView';
import ExcelViewer from './components/ExcelViewer';
import ErrorView from './components/ErrorView';

export default function App() {
    const [view, setView] = useState<AppView>('upload');
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [processingState, setProcessingState] = useState<ProcessingState>(
        createInitialProcessingState()
    );
    const [summary, setSummary] = useState<ExtractionSummary>(MOCK_SUMMARY);
    const [excelData] = useState<ExcelData>(MOCK_EXCEL_DATA);
    const [error] = useState<ErrorInfo>(MOCK_ERROR);
    const [cancelProcessing, setCancelProcessing] = useState<(() => void) | null>(null);

    const handleFileAccepted = useCallback((file: File) => {
        setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        });
        setView('processing');
        setProcessingState(createInitialProcessingState());

        const cancel = simulateProcessing(
            (state) => setProcessingState(state),
            () => {
                setSummary({ ...MOCK_SUMMARY, fileName: file.name });
                setView('success');
            }
        );
        setCancelProcessing(() => cancel);
    }, []);

    const handleCancelProcessing = useCallback(() => {
        if (cancelProcessing) {
            cancelProcessing();
            setCancelProcessing(null);
        }
        setView('upload');
    }, [cancelProcessing]);

    const handleViewExcel = useCallback(() => {
        setView('viewer');
    }, []);

    const handleBackToUpload = useCallback(() => {
        setUploadedFile(null);
        setView('upload');
    }, []);

    const handleRetry = useCallback(() => {
        if (uploadedFile) {
            // Simulate re-processing the same file
            setView('processing');
            setProcessingState(createInitialProcessingState());
            const cancel = simulateProcessing(
                (state) => setProcessingState(state),
                () => {
                    setView('success');
                }
            );
            setCancelProcessing(() => cancel);
        }
    }, [uploadedFile]);

    // Simulate an error (for demo: hold Shift while uploading to trigger error)
    const handleFileAcceptedWithError = useCallback(
        (file: File, simulateError: boolean) => {
            if (simulateError) {
                setUploadedFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                });
                setView('error');
                return;
            }
            handleFileAccepted(file);
        },
        [handleFileAccepted]
    );

    return (
        <>
            {view === 'upload' && (
                <UploadZone
                    onFileAccepted={handleFileAcceptedWithError}
                />
            )}

            {view === 'processing' && (
                <ProcessingView
                    state={processingState}
                    fileName={uploadedFile?.name || ''}
                    onCancel={handleCancelProcessing}
                />
            )}

            {view === 'success' && (
                <SuccessView
                    summary={summary}
                    onViewExcel={handleViewExcel}
                    onDownload={() => {/* Future: trigger download from FastAPI */ }}
                    onUploadNew={handleBackToUpload}
                />
            )}

            {view === 'viewer' && (
                <ExcelViewer
                    data={excelData}
                    onBack={() => setView('success')}
                    onDownload={() => {/* Future: trigger download from FastAPI */ }}
                />
            )}

            {view === 'error' && (
                <ErrorView
                    error={error}
                    onRetry={handleRetry}
                    onUploadNew={handleBackToUpload}
                />
            )}
        </>
    );
}
