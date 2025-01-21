import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse, streamText } from 'ai';
// import { streamText } from 'ai';

// import type { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { messages } = await req.json();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(messages, messages);
    // Process a POST request
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   stream: true,
    //   messages,
    // });
    // const response = streamText({
    //   model: 'gpt-4o-mini',
    //   // stream: true,
    //   system:
    //     'Provide a translation of the phrase provided by the user. Provide the translation only. Do not add any additional text.',
    //   messages,
    // });

    // console.log('response: ', response);
    // const stream = OpenAIStream(response);
    // return new StreamingTextResponse(stream);
    // return response.toDataStreamResponse();
  } else {
    // Handle any other HTTP method
  }
};
