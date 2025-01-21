'use client';

// import { openaiTranslation } from './lib/openai';
import { Message, useChat } from 'ai/react';
import { useState } from 'react';
import Image from 'next/image';

import france from './assets/france.png';
import spain from './assets/spain.png';
import japan from './assets/japan.png';
import parrot from './assets/parrot.png';

export default function Home() {
  const [displayTranslation, setDisplayTranslation] = useState<boolean>(false);
  const [translation, setTranslation] = useState<Message[]>([]);
  const [originalText, setOriginalText] = useState<string>('');

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
      // initialMessages: [
      //   {
      //     id: Date.now().toString(),
      //     role: 'system',
      //     // content: 'You will reply in French',
      //     content:
      //   },
      // ],
      initialInput:
        'Provide a translation of the phrase provided by the user. Provide the translation only. Do not add any additional text.',
    });

  // const response = await openaiTranslation(phrase, language);
  if (messages) {
    setDisplayTranslation(true);
    setTranslation(messages);
  }

  const resetForm = (e) => {
    e.preventDefault();
    setDisplayTranslation(false);
  };

  return (
    <section className='bg-cyan-300 min-h-screen flex justify-center items-center'>
      <main className='bg-white rounded-lg w-1/3'>
        <div className='border border-gray-300 m-3 rounded-lg'>
          <div className=' font-[family-name:var(--font-geist-sans)]'>
            <header className='bg-gray-400 mb-3 rounded-t-lg h-32'>
              <Image
                src={parrot}
                height={50}
                width={50}
                alt='parrot'
                className='border border-red-500'
              />
            </header>
            <form
              className='flex flex-col h-1/2 gap-3 mb-7 mx-3 border-2 border-black rounded-md'
              // action={translate}
              onSubmit={handleSubmit}
            >
              <div className=' flex flex-col justify-center gap-3'>
                <label className='text-blue-700 text-xl mt-7 font-semibold flex justify-center'>
                  {displayTranslation ? 'Original text' : 'Text to translate'}
                </label>
                <textarea
                  suppressHydrationWarning
                  cols={33}
                  rows={4}
                  // placeholder='input area'
                  className='bg-slate-200 rounded-md mx-5 p-2'
                  name='phrase'
                  defaultValue={originalText}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='text-blue-700 font-semibold text-xl mb-3 flex justify-center'>
                  {displayTranslation ? 'Your translation' : 'Select language'}
                </h2>
                {displayTranslation ? (
                  <div className='bg-slate-200 rounded-md mx-5 p-2'>
                    {messages.map((m) => (
                      <div key={m.id}>
                        {m.role === 'user' ? 'User: ' : 'AI: '}
                        {m.content}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className='pl-16'>
                    <span className='flex flex-row gap-2'>
                      <input
                        id='france'
                        name='language'
                        type='radio'
                        value='french'
                      />
                      <label htmlFor='france'>French</label>
                      <Image src={france} alt='FR' height={25} width={25} />
                    </span>
                    <span className='flex flex-row gap-2'>
                      <input
                        id='spanish'
                        name='language'
                        type='radio'
                        value='spanish'
                      />
                      <label htmlFor='spanish'>Spanish</label>
                      <Image src={spain} alt='SP' height={25} width={25} />
                    </span>

                    <span className='flex flex-row gap-2'>
                      <input
                        type='radio'
                        name='language'
                        value='japanese'
                        id='japan'
                      />
                      <label htmlFor='japan'>Japanese</label>
                      <Image src={japan} alt='JP' height={25} width={25} />
                    </span>
                  </span>
                )}
              </div>
              <span className=' mt-4 mb-9 flex justify-center'>
                {!displayTranslation ? (
                  <button
                    suppressHydrationWarning
                    type='submit'
                    className='bg-blue-800 text-xl text-white font-semibold w-5/6 py-1 rounded-md'
                  >
                    Translate
                  </button>
                ) : (
                  <button
                    suppressHydrationWarning
                    onClick={resetForm}
                    className='bg-blue-800 text-xl text-white font-semibold w-5/6 py-1 rounded-md'
                  >
                    Start Over
                  </button>
                )}
              </span>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
