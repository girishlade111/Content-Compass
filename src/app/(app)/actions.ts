'use server';

import { generateContentIdeas } from '@/ai/flows/content-ideation';
import { suggestCTA } from '@/ai/flows/cta-suggestion';
import type { ContentIdeationInput } from '@/ai/flows/content-ideation';
import type { SuggestCTAInput } from '@/ai/flows/cta-suggestion';

export async function generateContentIdeasAction(input: ContentIdeationInput) {
    return await generateContentIdeas(input);
}

export async function suggestCtaAction(input: SuggestCTAInput) {
    return await suggestCTA(input);
}
