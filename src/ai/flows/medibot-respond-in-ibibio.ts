// medibot-respond-in-ibibio.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for Medibot to respond to user queries in Ibibio.
 *
 * It includes:
 * - `medibotRespondInIbibio`: An async function that takes user query as input and returns Medibot's response in Ibibio.
 * - `MedibotRespondInIbibioInput`: The input type for the `medibotRespondInIbibio` function (a string).
 * - `MedibotRespondInIbibioOutput`: The output type for the `medibotRespondInIbibio` function (a string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedibotRespondInIbibioInputSchema = z.string().describe('The user query in Ibibio or English.');
export type MedibotRespondInIbibioInput = z.infer<typeof MedibotRespondInIbibioInputSchema>;

const MedibotRespondInIbibioOutputSchema = z.string().describe('Medibot response in Ibibio.');
export type MedibotRespondInIbibioOutput = z.infer<typeof MedibotRespondInIbibioOutputSchema>;

export async function medibotRespondInIbibio(input: MedibotRespondInIbibioInput): Promise<MedibotRespondInIbibioOutput> {
  return medibotRespondInIbibioFlow(input);
}

const medibotRespondInIbibioPrompt = ai.definePrompt({
  name: 'medibotRespondInIbibioPrompt',
  input: {schema: MedibotRespondInIbibioInputSchema},
  output: {schema: MedibotRespondInIbibioOutputSchema},
  prompt: `You are Medibot, a helpful AI assistant that provides health information in Ibibio.  Please respond to the following user query in Ibibio:\n\n{{query}}`,
});

const medibotRespondInIbibioFlow = ai.defineFlow(
  {
    name: 'medibotRespondInIbibioFlow',
    inputSchema: MedibotRespondInIbibioInputSchema,
    outputSchema: MedibotRespondInIbibioOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: `You are Medibot, a helpful AI assistant that provides health information in Ibibio.  Please respond to the following user query in Ibibio:\n\n${input}`,
      model: 'googleai/gemini-2.5-flash',
    });
    return text!;
  }
);
