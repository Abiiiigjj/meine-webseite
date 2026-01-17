import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocument, AnalysisResult } from '@/utils/analysis/gemini';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface RequestBody {
    image: string; // Base64 encoded image
    mimeType: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();

        if (!body.image || !body.mimeType) {
            return NextResponse.json(
                { error: 'Missing image or mimeType' },
                { status: 400 }
            );
        }

        // Validate mime type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(body.mimeType)) {
            return NextResponse.json(
                { error: 'Invalid file type. Allowed: JPG, PNG, WebP, PDF' },
                { status: 400 }
            );
        }

        // Remove data URL prefix if present
        const base64Data = body.image.includes('base64,')
            ? body.image.split('base64,')[1]
            : body.image;

        const result: AnalysisResult = await analyzeDocument(base64Data, body.mimeType);

        // Check for error in result
        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: 422 }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('Analysis error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            { error: `Analyse fehlgeschlagen: ${errorMessage}` },
            { status: 500 }
        );
    }
}
