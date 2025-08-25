'use server';

/**
 * @fileOverview This file defines a Genkit flow for validating the type of an uploaded document.
 *
 * The flow uses an LLM to determine if the document is an accepted Indian document type.
 *
 * - validateDocumentType - A function that validates the document type.
 * - ValidateDocumentTypeInput - The input type for the validateDocumentType function.
 * - ValidateDocumentTypeOutput - The return type for the validateDocumentType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateDocumentTypeInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A data URI of the document to validate, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  filename: z.string().describe('The filename of the document.'),
});
export type ValidateDocumentTypeInput = z.infer<typeof ValidateDocumentTypeInputSchema>;

const ValidateDocumentTypeOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the document type is valid or not.'),
  documentType: z.string().describe('The type of the document if valid, otherwise null.'),
});
export type ValidateDocumentTypeOutput = z.infer<typeof ValidateDocumentTypeOutputSchema>;

export async function validateDocumentType(input: ValidateDocumentTypeInput): Promise<ValidateDocumentTypeOutput> {
  return validateDocumentTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateDocumentTypePrompt',
  input: {schema: ValidateDocumentTypeInputSchema},
  output: {schema: ValidateDocumentTypeOutputSchema},
  prompt: `You are an expert in document recognition for Indian MSMEs.

You will determine if the uploaded document is of a type that is accepted by our system.
Accepted document types include: GST Invoice, e-Way Bill, Aadhaar Card, PAN Card, Bank Statement, Purchase Order, Cheque, KYC Document.

Given the filename '{{filename}}' and the document data, determine if it is a valid document type. Set isValid to true if it is, and provide the documentType. Otherwise, set isValid to false.

Here is the document:
{{media url=documentDataUri}}
`,
});

const validateDocumentTypeFlow = ai.defineFlow(
  {
    name: 'validateDocumentTypeFlow',
    inputSchema: ValidateDocumentTypeInputSchema,
    outputSchema: ValidateDocumentTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
