'use server';
/**
 * @fileOverview This file contains the Genkit flow for SuvidhaOCR, which processes documents.
 *
 * - processDocument: The main function that orchestrates the document processing.
 * - ProcessedData: The output type for the processing flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the input schema for the main flow
const OcrInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The document file to process, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  outputFormat: z.enum(['json', 'text', 'csv']),
});

export type OcrInput = z.infer<typeof OcrInputSchema>;

// Define the structure for the JSON output
const JsonOutputStructure = z.object({
    keyValuePairs: z.any().describe("All extracted key-value pairs from the document as a JSON object."),
    tables: z.any().describe("Any tables found in the document, represented as an array of JSON objects."),
    fullText: z.string().describe("The complete extracted text from the document."),
});

// Define the final output schema for the main flow
const ProcessedDataSchema = z.object({
  format: z.enum(['json', 'text', 'csv']),
  data: z.union([JsonOutputStructure, z.string()]),
});

export type ProcessedData = z.infer<typeof ProcessedDataSchema>;

/**
 * Main exported function that clients will call.
 * This wraps the Genkit flow.
 */
export async function processDocument(input: OcrInput): Promise<ProcessedData> {
  return await suvidhaOcrFlow(input);
}

const basePrompt = `You are an expert data entry operator for businesses in India. Your task is to analyze the provided document.

The document may be an invoice, receipt, purchase order, KYC document, or other common business document. It may contain text in English, Hindi (Devanagari script), or a mix of regional languages.

Your goals are:
1.  Extract all text accurately.
2.  Identify and extract all key-value pairs (e.g., "Invoice Number": "INV-123", "Date": "15/07/2024").
3.  Identify and extract any tables, maintaining their row and column structure.

Prioritize accuracy and maintain the original structure as much as possible.

Document to process: {{media url=fileDataUri}}
`;

// Prompt for structured JSON output
const jsonPrompt = ai.definePrompt({
  name: 'jsonPrompt',
  input: { schema: OcrInputSchema },
  output: { schema: JsonOutputStructure },
  prompt: basePrompt,
});

// Prompt for plain text output
const textPrompt = ai.definePrompt({
  name: 'textPrompt',
  input: { schema: OcrInputSchema },
  prompt: `${basePrompt}
  
  Please provide the full extracted text from the document as a clean, formatted plain text string.
  `,
});

// Prompt for CSV output
const csvPrompt = ai.definePrompt({
  name: 'csvPrompt',
  input: { schema: OcrInputSchema },
  prompt: `${basePrompt}
  
  Please convert the first and largest table found in the document into a CSV formatted string. Include a header row. If no table is found, return an empty string.
  `,
});


// The main Genkit flow
const suvidhaOcrFlow = ai.defineFlow(
  {
    name: 'suvidhaOcrFlow',
    inputSchema: OcrInputSchema,
    outputSchema: ProcessedDataSchema,
  },
  async (input) => {
    let processedData: any;

    switch (input.outputFormat) {
      case 'json':
        const { output: jsonOutput } = await jsonPrompt(input);
        processedData = jsonOutput!;
        break;
      case 'text':
        const { text: textOutput } = await textPrompt(input);
        processedData = textOutput;
        break;
      case 'csv':
        const { text: csvOutput } = await csvPrompt(input);
        processedData = csvOutput;
        break;
      default:
        throw new Error('Unsupported output format');
    }

    return {
      format: input.outputFormat,
      data: processedData,
    };
  }
);
