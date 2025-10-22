'use server';
/**
 * @fileOverview An AI health assistant for answering health-related questions.
 *
 * - medibotAIHealthAssistant - A function that handles the health-related questions.
 * - MedibotAIHealthAssistantInput - The input type for the medibotAIHealthAssistant function.
 * - MedibotAIHealthAssistantOutput - The return type for the medibotAIHealthAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedibotAIHealthAssistantInputSchema = z.object({
  query: z.string().describe('The health-related question from the user.'),
  language: z.enum(['en', 'ib']).default('en').describe('The language to respond in (English or Ibibio).'),
});
export type MedibotAIHealthAssistantInput = z.infer<typeof MedibotAIHealthAssistantInputSchema>;

const MedibotAIHealthAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant response to the health-related question.'),
});
export type MedibotAIHealthAssistantOutput = z.infer<typeof MedibotAIHealthAssistantOutputSchema>;

export async function medibotAIHealthAssistant(input: MedibotAIHealthAssistantInput): Promise<MedibotAIHealthAssistantOutput> {
  return medibotAIHealthAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medibotAIHealthAssistantPrompt',
  input: {schema: MedibotAIHealthAssistantInputSchema},
  output: {schema: MedibotAIHealthAssistantOutputSchema},
  prompt: `You are Medibot, an AI health assistant.  Answer the user's health-related question to the best of your ability.  Respond in Ibibio if the user has selected Ibibio as the language.

Language: {{{language}}}

Question: {{{query}}}`,
});

const medibotAIHealthAssistantFlow = ai.defineFlow(
  {
    name: 'medibotAIHealthAssistantFlow',
    inputSchema: MedibotAIHealthAssistantInputSchema,
    outputSchema: MedibotAIHealthAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
