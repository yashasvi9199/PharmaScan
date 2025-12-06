/* Bounding box in image coordinates */ 
export type BBox = {
    x: number;
    y: number;
    w: number;
    h: number;
};

/* Indivisual OCR block */ 
export type OCRBlock = {
    text: string;
    confidence?: number;
    bbox?: BBox
};

/* Full OCR result provided by provider or worker */ 
export type OCRResults ={
    text?: string;
    lines?: string[];
    blocks?: OCRBlock[];
    confidence?: number;
};

/* Basic image info */
export type ScanImageInfo = {
    width?: number;
    height?: number;
    format?: string;    //"jpeg" | "png" | "webp"
};

/* Metadata */
export type ScanMetadata = Record<string, string | number | boolean>;

/* Raw payload */
export type ScanRaw = {
    ocr?: OCRResults;
    image?: ScanImageInfo;
    metadata?: ScanMetadata;
} & Record<string, unknown>;

/* Response returned */
export interface ScanResponse {
    id: string;
    extractedText: string;
    confidence?: number;
    raw?: ScanRaw;
    createdAt?: string;
}