import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages, language } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You will reply in ${language}`,
    maxTokens: 100,
    temperature: 1.1,
    messages,
  });

  return result.toDataStreamResponse();
}
