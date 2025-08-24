'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating content ideas and titles based on keywords.
 *
 * - generateContentIdeas - A function that generates content ideas.
 * - ContentIdeationInput - The input type for the generateContentIdeas function.
 * - ContentIdeationOutput - The return type for the generateContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentIdeationInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Comma separated keywords related to the SaaS product and target audience.'
    ),
});
export type ContentIdeationInput = z.infer<typeof ContentIdeationInputSchema>;

const ContentIdeationOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .describe('An array of content ideas and titles.'),
});
export type ContentIdeationOutput = z.infer<typeof ContentIdeationOutputSchema>;

export async function generateContentIdeas(
  input: ContentIdeationInput
): Promise<ContentIdeationOutput> {
  return contentIdeationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentIdeationPrompt',
  input: {schema: ContentIdeationInputSchema},
  output: {schema: ContentIdeationOutputSchema},
  prompt: `You are a content marketing strategist. Generate 5 content ideas and titles based on the following keywords:

{{keywords}}

Each idea should be concise and engaging. Focus on topics that would attract, engage, and convert the target audience.

Output the ideas as a numbered list.

Example Output:
1. Idea 1
2. Idea 2
3. Idea 3
4. Idea 4
5. Idea 5`,
});

const contentIdeationFlow = ai.defineFlow(
  {
    name: 'contentIdeationFlow',
    inputSchema: ContentIdeationInputSchema,
    outputSchema: ContentIdeationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Split the ideas into an array
    const ideas = output!.ideas;
    return {
      ideas: ideas!,
    };
  }
);
