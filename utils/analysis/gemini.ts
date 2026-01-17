import { SYSTEM_PROMPT, USER_PROMPT } from './prompts';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface AnalysisResult {
    title: string;
    status: 'green' | 'yellow' | 'red';
    warning?: string;
    tasks: string[];
    facts: {
        deadline?: string | null;
        amount?: string | null;
        iban?: string | null;
        reference?: string | null;
    };
    glossary?: { term: string; definition: string }[];
    error?: string;
}

interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: { text?: string }[];
        };
    }[];
    error?: {
        message: string;
    };
}

export async function analyzeDocument(base64Image: string, mimeType: string): Promise<AnalysisResult> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: SYSTEM_PROMPT },
                    { text: USER_PROMPT },
                    {
                        inline_data: {
                            mime_type: mimeType,
                            data: base64Image,
                        },
                    },
                ],
            },
        ],
        generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
        },
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data: GeminiResponse = await response.json();

    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
        throw new Error('No response from Gemini API');
    }

    try {
        // Parse the JSON response
        const result: AnalysisResult = JSON.parse(textResponse);
        return result;
    } catch {
        // If parsing fails, try to extract JSON from markdown code blocks
        const jsonMatch = textResponse.match(/```json\s*([\s\S]*?)\s*```/) ||
            textResponse.match(/```\s*([\s\S]*?)\s*```/) ||
            textResponse.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            const jsonStr = jsonMatch[1] || jsonMatch[0];
            return JSON.parse(jsonStr);
        }

        throw new Error('Failed to parse Gemini response as JSON');
    }
}
