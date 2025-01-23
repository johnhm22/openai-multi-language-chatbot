'use client';

import { useChat } from 'ai/react';
import Image from 'next/image';
import { useState } from 'react';

import france from './assets/france.png';
import spain from './assets/spain.png';
import japan from './assets/japan.png';

export default function Home() {
  type Language = 'French' | 'Spanish' | 'Japanese';
  const [language, setLanguage] = useState<Language | null>();

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      body: {
        language,
      },
    });

  return (
    <section className='min-h-screen flex justify-center items-center'>
      <main className='bg-zinc-100 rounded-lg w-1/3'>
        <div className='border border-gray-300 m-3 rounded-lg'>
          <div className=' font-[family-name:var(--font-geist-sans)]'>
            <header className='bg-[url(./assets/continents.png)] bg-contain bg-center mb-3 rounded-t-lg h-32 content-center flex justify-center'></header>
            <section className='flex flex-col h-1/2 gap-3 mb-7 mx-3 border-2 border-black rounded-md'>
              <div className='flex flex-col gap-1'>
                <div className='text-blue-700 font-semibold text-md mb-3 mx-1 text-center'>
                  Select the language for the response by clicking the flag at
                  the bottom
                </div>
                <div className='overflow-y-auto h-auto max-h-52'>
                  {messages.map((m) => (
                    <div
                      className={
                        m.role === 'user'
                          ? 'bg-cyan-200 rounded-md mx-5 p-2 mb-2'
                          : 'bg-gray-200 rounded-md mx-5 p-2 mb-2'
                      }
                      key={m.id}
                    >
                      {m.role === 'user' ? 'User: ' : 'AI: '}
                      {m.content}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className=' flex flex-col justify-center gap-3'>
                  <input
                    suppressHydrationWarning
                    placeholder='type question here'
                    className='bg-slate-200 rounded-md mx-5 p-2'
                    name='text'
                    value={input}
                    onChange={handleInputChange}
                  />
                </div>
                <span className=' mt-4 mb-2 flex justify-center'>
                  <button
                    suppressHydrationWarning
                    type='submit'
                    className='bg-blue-800 text-xl text-white font-semibold w-5/6 py-1 rounded-md'
                  >
                    Send
                  </button>
                </span>
                <span className='px-3 mb-3 flex flex-row gap-2 justify-between'>
                  <Image
                    src={france}
                    height={35}
                    width={35}
                    alt='French flag'
                    className={
                      language === 'French'
                        ? 'hover:cursor-pointer shadow-xl'
                        : 'hover:cursor-pointer'
                    }
                    data-lang='french'
                    onClick={() => setLanguage('French')}
                  />
                  <Image
                    src={spain}
                    height={35}
                    width={35}
                    alt='Spanish flag'
                    className={
                      language === 'Spanish'
                        ? 'hover:cursor-pointer shadow-xl'
                        : 'hover:cursor-pointer'
                    }
                    onClick={() => setLanguage('Spanish')}
                  />
                  <Image
                    src={japan}
                    height={35}
                    width={35}
                    alt='Japanese flag'
                    className={
                      language === 'Japanese'
                        ? 'hover:cursor-pointer shadow-xl'
                        : 'hover:cursor-pointer'
                    }
                    data-lang='japanese'
                    onClick={() => setLanguage('Japanese')}
                  />
                </span>
              </form>
            </section>
          </div>
        </div>
      </main>
    </section>
  );
}
