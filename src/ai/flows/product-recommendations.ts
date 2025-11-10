// src/ai/flows/product-recommendations.ts
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z.array(
    z.string().describe('The IDs of products the user has viewed')
  ).optional().describe('The user browsing history, as a list of product IDs.'),
  pastPurchases: z.array(
    z.string().describe('The IDs of products the user has purchased')
  ).optional().describe('The user past purchases, as a list of product IDs.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  productRecommendations: z.array(
    z.string().describe('The IDs of products recommended to the user')
  ).describe('A list of product IDs recommended to the user based on their browsing history and past purchases.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert in product recommendations. Based on a user's browsing history and past purchases, you will recommend a list of products that the user might be interested in.

  The output must be a list of product IDs.

  Browsing History: {{browsingHistory}}
  Past Purchases: {{pastPurchases}}`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
