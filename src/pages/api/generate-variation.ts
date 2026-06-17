export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() as { format?: string; knowledgeText?: string };
  const format = body.format ?? 'qa';

  // v2: replace this block with a real Anthropic SDK call:
  //
  // import Anthropic from '@anthropic-ai/sdk';
  // const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });
  // const message = await client.messages.create({
  //   model: 'claude-sonnet-4-6',
  //   max_tokens: 300,
  //   messages: [{
  //     role: 'user',
  //     content: `Given this knowledge atom:\n\n${body.knowledgeText}\n\nGenerate a ${format} variation. Be concise and grounded in the atom's content only.`
  //   }]
  // });
  // return new Response(JSON.stringify({ content: message.content[0].text }), {
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // v1: static fallback
  const STATIC: Record<string, string> = {
    qa: "Escalate when fixing it requires authority, access, or expertise you don't have — not because the customer is upset.",
    scenario: "A customer calls about a declined card. The decline reason is an expired card, no fraud. Which tier? Tier 1 — handle at desk.",
    jobaid: "T1: handle at desk. T2: warm transfer. T3: IT ticket. T4: escalate now (active harm).",
    micro: "The rule: escalate when you lack the authority, access, or expertise to fix it. Emotion is not the signal.",
  };

  return new Response(JSON.stringify({ content: STATIC[format] ?? STATIC.qa }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
