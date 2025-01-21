'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const openaiTranslation = async (
  text: FormDataEntryValue | null,
  language: FormDataEntryValue | null,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Provide a translation of the phrase provided by the user. Provide the translation only. Do not add any additional text.',
      },
      {
        role: 'user',
        content: `Please translate this text ${text} to the language of ${language}`,
      },
    ],
  });
  return response.choices[0].message.content;
};
