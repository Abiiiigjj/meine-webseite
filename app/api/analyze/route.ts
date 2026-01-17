import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocument, AnalysisResult } from '@/utils/analysis/gemini';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Normalized response schema for the analyze API
 * Maps the internal AnalysisResult to the user-facing schema
 */
interface AnalyzeResponse {
    summary: string;
    urgency: 'green' | 'yellow' | 'red';
    warning?: string;
    tasks: string[];
    facts: {
        deadline?: string | null;
        amount?: string | null;
        iban?: string | null;
        reference?: string | null;
    };
    vocabulary: { term: string; definition: string }[];
    error?: string;
}

interface RequestBody {
    image?: string;      // Base64 encoded image
    mimeType?: string;   // MIME type of the image
    ocrText?: string;    // Pre-extracted OCR text (optional)
}

/**
 * POST /api/analyze
 * 
 * Analyzes a document image using Gemini AI.
 * Accepts either a Base64 image or pre-extracted OCR text.
 * 
 * @body {string} image - Base64 encoded image data
 * @body {string} mimeType - MIME type (image/jpeg, image/png, image/webp, application/pdf)
 * @body {string} ocrText - Optional pre-extracted OCR text
 * 
 * @returns {AnalyzeResponse} Structured analysis result
 */
export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();

        // Validate input - need either image or ocrText
        if (!body.image && !body.ocrText) {
            return NextResponse.json(
                { error: 'Missing image or ocrText. Provide at least one.' },
                { status: 400 }
            );
        }

        // If image is provided, validate mimeType
        if (body.image && !body.mimeType) {
            return NextResponse.json(
                { error: 'mimeType is required when providing an image' },
                { status: 400 }
            );
        }

        // Validate mime type
        if (body.mimeType) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
            if (!allowedTypes.includes(body.mimeType)) {
                return NextResponse.json(
                    { error: 'Invalid file type. Allowed: JPG, PNG, WebP, PDF' },
                    { status: 400 }
                );
            }
        }

        let result: AnalysisResult;

        if (body.image) {
            // Remove data URL prefix if present
            const base64Data = body.image.includes('base64,')
                ? body.image.split('base64,')[1]
                : body.image;

            result = await analyzeDocument(base64Data, body.mimeType!);
        } else {
            // TODO: Implement text-only analysis when ocrText is provided
            // For now, return an error as we need the image for Gemini vision
            return NextResponse.json(
                { error: 'Text-only analysis not yet implemented. Please provide an image.' },
                { status: 501 }
            );
        }

        // Check for error in result
        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: 422 }
            );
        }

        // Map internal schema to user-facing schema
        const response: AnalyzeResponse = {
            summary: result.title,
            urgency: result.status,
            warning: result.warning,
            tasks: result.tasks || [],
            facts: result.facts || {},
            vocabulary: result.glossary || [],
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Analysis error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            { error: `Analyse fehlgeschlagen: ${errorMessage}` },
            { status: 500 }
        );
    }
}
