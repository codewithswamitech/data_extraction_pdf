import type {
    ProcessingState,
    ExtractionSummary,
    ExcelData,
    ErrorInfo,
    RecentFile,
} from './types';

/* ===== Mock Data ===== */
/* Replace these with real API calls when FastAPI backend is ready */

export const MOCK_RECENT_FILES: RecentFile[] = [
    {
        id: '1',
        fileName: 'Q3_Revenue_Report.pdf',
        tablesFound: 12,
        fileSize: '4.2 MB',
        processedAt: '2 mins ago',
    },
    {
        id: '2',
        fileName: 'Invoices_Batch_2023.pdf',
        tablesFound: 45,
        fileSize: '12.8 MB',
        processedAt: '1 hour ago',
    },
    {
        id: '3',
        fileName: 'Project_Expenses.pdf',
        tablesFound: 3,
        fileSize: '850 KB',
        processedAt: 'Yesterday',
    },
];

export function createInitialProcessingState(): ProcessingState {
    return {
        progress: 0,
        stages: [
            { id: 'upload', label: 'Upload Successful', status: 'pending' },
            { id: 'reading', label: 'Reading Document', status: 'pending' },
            { id: 'detecting', label: 'Detecting Tables', status: 'pending' },
            { id: 'extracting', label: 'Extracting Tables...', status: 'pending' },
            { id: 'creating', label: 'Creating Excel', status: 'pending' },
            { id: 'formatting', label: 'Formatting Sheets', status: 'pending' },
        ],
        totalPages: 193,
        pagesScanned: 0,
        tablesFound: 0,
        estimatedRemaining: '~2 min',
    };
}

export const MOCK_SUMMARY: ExtractionSummary = {
    tablesExtracted: 193,
    sheetsCreated: 193,
    fileSize: '669 KB',
    processingTime: '2 min 35 sec',
    fileName: 'Quarterly_Report_v2.pdf',
};

export const MOCK_ERROR: ErrorInfo = {
    code: 'PDF_READ_ERROR_001',
    title: 'Processing Failed',
    message:
        "We couldn't extract the tables from this document because the file format appears to be unsupported or the file is encrypted with a password we cannot bypass.",
    tips: [
        'Verify the file is a valid PDF and opens correctly in a standard viewer.',
        'Ensure the PDF is not password protected or has "copying" restricted.',
        'Check if the file size exceeds the 20MB limit for web processing.',
    ],
};

export const MOCK_EXCEL_DATA: ExcelData = {
    fileName: 'report_Tables.xlsx',
    sheets: [
        {
            name: 'Table_1.csv',
            columns: ['A - DATE', 'B - INVOICE ID', 'C - DESCRIPTION', 'D - VENDOR', 'E - AMOUNT', 'F - STATUS'],
            rows: [
                [
                    { value: '2023-11-01' },
                    { value: 'INV-9821-A' },
                    { value: 'Cloud Hosting Services' },
                    { value: 'DigitalOcean' },
                    { value: '$1,240.00' },
                    { value: 'PAID' },
                ],
                [
                    { value: '2023-11-04' },
                    { value: 'INV-9822-B' },
                    { value: 'Domain Renewals' },
                    { value: 'Namecheap Inc.' },
                    { value: '$45.99' },
                    { value: 'PAID' },
                ],
                [
                    { value: '2023-11-05' },
                    { value: 'INV-9825-C' },
                    { value: 'Marketing Campaign Materials' },
                    { value: 'PrintHouse' },
                    { value: '$850.00' },
                    { value: 'PENDING' },
                ],
                [
                    { value: '2023-11-10' },
                    { value: 'INV-9830-Z' },
                    { value: 'Software Subscription' },
                    { value: 'Adobe Inc.' },
                    { value: '$52.99' },
                    { value: 'PAID' },
                ],
            ],
        },
        {
            name: 'Table_2.csv',
            columns: ['A - ITEM ID', 'B - DESCRIPTION', 'C - UNIT PRICE', 'D - QUANTITY', 'E - NOTES'],
            rows: [
                [
                    { value: '#EXT-9021' },
                    { value: 'Cloud Hosting - Tier 3' },
                    { value: '$2,450.00' },
                    { value: '1' },
                    { value: 'Monthly recurring' },
                ],
                [
                    { value: '#EXT-9022' },
                    { value: 'Database Backup Svcs' },
                    { value: '$1,240.00' },
                    { value: '12' },
                    { value: 'N/A' },
                ],
                [
                    { value: '#EXT-9023' },
                    { value: 'Security Audit License' },
                    { value: '$3,100.00' },
                    { value: '1' },
                    { value: 'One-time fee' },
                ],
            ],
        },
        {
            name: 'Table_3.csv',
            columns: ['A - DEPARTMENT', 'B - BUDGET', 'C - ACTUAL', 'D - VARIANCE'],
            rows: [
                [
                    { value: 'Engineering' },
                    { value: '$45,000' },
                    { value: '$42,300' },
                    { value: '-$2,700' },
                ],
                [
                    { value: 'Marketing' },
                    { value: '$30,000' },
                    { value: '$31,500' },
                    { value: '+$1,500' },
                ],
                [
                    { value: 'Operations' },
                    { value: '$25,000' },
                    { value: '$24,800' },
                    { value: '-$200' },
                ],
                [
                    { value: 'Sales' },
                    { value: '$35,000' },
                    { value: '$38,200' },
                    { value: '+$3,200' },
                ],
            ],
        },
    ],
};

// Simulate processing progress over time
export function simulateProcessing(
    onUpdate: (state: ProcessingState) => void,
    onComplete: () => void
): () => void {
    const state = createInitialProcessingState();
    let cancelled = false;

    const steps = [
        { progress: 15, stageIndex: 0, pages: 0, tables: 0, est: '~2 min' },
        { progress: 25, stageIndex: 1, pages: 30, tables: 0, est: '~1 min 45s' },
        { progress: 40, stageIndex: 2, pages: 90, tables: 15, est: '~1 min 20s' },
        { progress: 55, stageIndex: 2, pages: 140, tables: 28, est: '~1 min' },
        { progress: 70, stageIndex: 3, pages: 165, tables: 42, est: '~45s' },
        { progress: 80, stageIndex: 3, pages: 185, tables: 120, est: '~30s' },
        { progress: 90, stageIndex: 4, pages: 193, tables: 175, est: '~15s' },
        { progress: 95, stageIndex: 5, pages: 193, tables: 190, est: '~5s' },
        { progress: 100, stageIndex: 5, pages: 193, tables: 193, est: 'Done' },
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {
        if (cancelled) return;
        if (stepIndex >= steps.length) {
            clearInterval(interval);
            onComplete();
            return;
        }

        const step = steps[stepIndex];
        state.progress = step.progress;
        state.pagesScanned = step.pages;
        state.tablesFound = step.tables;
        state.estimatedRemaining = step.est;

        // Update stage statuses
        state.stages = state.stages.map((s, i) => ({
            ...s,
            status: i < step.stageIndex ? 'completed' : i === step.stageIndex ? 'active' : 'pending',
            detail:
                i === step.stageIndex && step.stageIndex === 3
                    ? `Processing structures and formatting cell data.`
                    : s.detail,
        }));

        onUpdate({ ...state });
        stepIndex++;
    }, 800);

    return () => {
        cancelled = true;
        clearInterval(interval);
    };
}
