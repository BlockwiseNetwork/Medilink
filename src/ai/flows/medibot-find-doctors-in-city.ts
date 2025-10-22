'use server';
/**
 * @fileOverview An AI agent that finds doctors in a specific city.
 *
 * - findDoctorsInCity - A function that handles the process of finding doctors in a city.
 * - FindDoctorsInCityInput - The input type for the findDoctorsInCity function.
 * - FindDoctorsInCityOutput - The return type for the findDoctorsInCity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindDoctorsInCityInputSchema = z.object({
  city: z.string().describe('The city to search for doctors in.'),
});
export type FindDoctorsInCityInput = z.infer<typeof FindDoctorsInCityInputSchema>;

const DoctorSchema = z.object({
  name: z.string().describe('The name of the doctor.'),
  specialty: z.string().describe('The doctor\'s specialty.'),
  city: z.string().describe('The city where the doctor is located.'),
  rating: z.number().describe('The doctor\'s rating (1-5).'),
  contact: z.string().describe('The doctor\'s contact information.'),
});

const FindDoctorsInCityOutputSchema = z.array(DoctorSchema).describe('A list of doctors in the specified city.');
export type FindDoctorsInCityOutput = z.infer<typeof FindDoctorsInCityOutputSchema>;

export async function findDoctorsInCity(input: FindDoctorsInCityInput): Promise<FindDoctorsInCityOutput> {
  return findDoctorsInCityFlow(input);
}

const findDoctorsInCityPrompt = ai.definePrompt({
  name: 'findDoctorsInCityPrompt',
  input: {schema: FindDoctorsInCityInputSchema},
  output: {schema: FindDoctorsInCityOutputSchema},
  prompt: `You are a helpful AI assistant designed to find doctors in a specific city.

  Find doctors in the following city: {{{city}}}
  Return a JSON array of doctors with the following schema:
  [{
    "name": "string",
    "specialty": "string",
    "city": "string",
    "rating": number,
    "contact": "string"
  }]
  `,
});

const findDoctorsInCityFlow = ai.defineFlow(
  {
    name: 'findDoctorsInCityFlow',
    inputSchema: FindDoctorsInCityInputSchema,
    outputSchema: FindDoctorsInCityOutputSchema,
  },
  async input => {
    const {output} = await findDoctorsInCityPrompt(input);
    return output!;
  }
);
