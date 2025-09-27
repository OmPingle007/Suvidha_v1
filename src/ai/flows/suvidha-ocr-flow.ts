// src/ai/flows/suvidha-ocr-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow for processing documents with multilingual OCR capabilities.
 *
 * - suvidhaOcrFlow - The main flow function for document processing.
 * - SuvidhaOcrInput - The input type for the suvidhaOcrFlow function.
 * - SuvidhaOcrOutput - The return type for the suvidhaOcrFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuvidhaOcrInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A data URI of the document to process, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  outputFormat: z.enum(['json', 'text', 'csv']).describe('The desired output format.'),
  filename: z.string().describe('The original filename of the document.'),
});
export type SuvidhaOcrInput = z.infer<typeof SuvidhaOcrInputSchema>;

const SuvidhaOcrOutputSchema = z.object({
  processedData: z.any().describe('The extracted data in the requested format.'),
  format: z.enum(['json', 'text', 'csv']).describe('The format of the processed data.'),
  originalFilename: z.string().describe('The original filename of the document, without extension.'),
});
export type SuvidhaOcrOutput = z.infer<typeof SuvidhaOcrOutputSchema>;

// Define a Zod schema for the expected structured output for JSON format.
const JsonOutputStructure = z.object({
    documentType: z.string().describe("The identified type of the document (e.g., 'Invoice', 'Receipt', 'PAN Card')."),
    keyValuePairs: z.record(z.string()).describe("All extracted key-value pairs from the document."),
    tables: z.array(z.array(z.record(z.string()))).describe("Any tables found in the document, represented as an array of rows, where each row is an object."),
    fullText: z.string().describe("The complete extracted text from the document."),
});

// Define a separate prompt for each output format to guide the model effectively.
const jsonPrompt = ai.definePrompt({
    name: 'suvidhaOcrJsonPrompt',
    input: { schema: SuvidhaOcrInputSchema },
    output: { schema: JsonOutputStructure },
    prompt: `You are an expert data entry operator for Indian MSMEs. Analyze this document. Identify if it is an invoice, receipt, purchase order, or another common business document.
    
    The document may contain English, Hindi (Devanagari), and other regional Indian languages. Prioritize accuracy and structure.
    
    Extract all text, key-value pairs (like 'Invoice Number': 'INV-123'), and any tabular data.
    
    Provide the output in a structured JSON format with keys for 'documentType', 'keyValuePairs', 'tables', and 'fullText'.

    Document to process:
    {{media url=documentDataUri}}
    `,
});

const textPrompt = ai.definePrompt({
    name: 'suvidhaOcrTextPrompt',
    input: { schema: SuvidhaOcrInputSchema },
    prompt: `You are an expert data entry operator. Analyze this document, which may be in English or an Indian regional language like Hindi.
    
    Extract all text content from the document.
    
    Return the output as clean, formatted plain text, preserving paragraphs and line breaks where appropriate.

    Document to process:
    {{media url=documentDataUri}}
    `,
});

const csvPrompt = ai.definePrompt({
    name: 'suvidhaOcrCsvPrompt',
    input: { schema: SuvidhaOcrInputSchema },
    prompt: `You are an expert data entry operator. Analyze this document.
    
    Identify any tables within the document. Extract the data from these tables.
    
    Convert ONLY the first extracted table into a CSV formatted string. Include a header row. If no tables are found, return an empty string.

    Document to process:
    {{media url=documentDataUri}}
    `,
});

export const suvidhaOcrFlow = ai.defineFlow(
  {
    name: 'suvidhaOcrFlow',
    inputSchema: SuvidhaOcrInputSchema,
    outputSchema: SuvidhaOcrOutputSchema,
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

    const originalFilename = input.filename.split('.').slice(0, -1).join('.');

    return {
      processedData,
      format: input.outputFormat,
      originalFilename,
    };
  }
);
