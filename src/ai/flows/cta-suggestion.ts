'use server';
/**
 * @fileOverview A call to action suggestion AI agent.
 *
 * - suggestCTA - A function that handles the call to action suggestion process.
 * - SuggestCTAInput - The input type for the suggestCTA function.
 * - SuggestCTAOutput - The return type for the suggestCTA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCTAInputSchema = z.object({
  contentTopic: z.string().describe('The topic of the content.'),
  targetAudience: z.string().describe('The target audience for the content.'),
  productDescription: z.string().describe('A description of the product or service being offered.'),
});
export type SuggestCTAInput = z.infer<typeof SuggestCTAInputSchema>;

const SuggestCTAOutputSchema = z.object({
  callToAction: z.string().describe('A suggested call to action for the content.'),
  reasoning: z.string().describe('The reasoning behind the suggested call to action.'),
});
export type SuggestCTAOutput = z.infer<typeof SuggestCTAOutputSchema>;

export async function suggestCTA(input: SuggestCTAInput): Promise<SuggestCTAOutput> {
  return suggestCTAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCTAPrompt',
  input: {schema: SuggestCTAInputSchema},
  output: {schema: SuggestCTAOutputSchema},
  prompt: `You are an expert content strategist specializing in call-to-action optimization.

  Based on the content topic, target audience, and product description, suggest a relevant call to action that maximizes conversions. Explain your reasoning for the suggestion.

  Content Topic: {{{contentTopic}}}
  Target Audience: {{{targetAudience}}}
  Product Description: {{{productDescription}}}

  Provide a single call to action suggestion and explain why it is likely to be effective given the context.
  `,
});

const suggestCTAFlow = ai.defineFlow(
  {
    name: 'suggestCTAFlow',
    inputSchema: SuggestCTAInputSchema,
    outputSchema: SuggestCTAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
