/* ===== Types for TableExtract Frontend ===== */

export type AppView = 'upload' | 'processing' | 'success' | 'viewer' | 'error';

export interface UploadedFile {
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

export interface ProcessingStage {
    id: string;
    label: string;
    status: 'pending' | 'active' | 'completed';
    detail?: string;
}

export interface ProcessingState {
    progress: number;
    stages: ProcessingStage[];
    totalPages: number;
    pagesScanned: number;
    tablesFound: number;
    estimatedRemaining: string;
}

export interface ExtractionSummary {
    tablesExtracted: number;
    sheetsCreated: number;
    fileSize: string;
    processingTime: string;
    fileName: string;
}

export interface CellData {
    value: string;
    isHeader?: boolean;
    isEditing?: boolean;
}

export interface SheetData {
    name: string;
    columns: string[];
    rows: CellData[][];
}

export interface ExcelData {
    fileName: string;
    sheets: SheetData[];
}

export interface ErrorInfo {
    code: string;
    title: string;
    message: string;
    tips: string[];
}

export interface RecentFile {
    id: string;
    fileName: string;
    tablesFound: number;
    fileSize: string;
    processedAt: string;
}

/* ===== API layer (future FastAPI integration) ===== */

// These functions currently return mock data.
// When FastAPI backend is ready, replace with actual fetch calls.

export interface ApiConfig {
    baseUrl: string;
}

export const API_CONFIG: ApiConfig = {
    baseUrl: '/api', // Will point to FastAPI server
};
