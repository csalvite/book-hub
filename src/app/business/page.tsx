'use client';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { EyeSlashFilledIcon } from '@/components/Forms/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/Forms/EyeFilledIcon';
import { useState } from 'react';
import { MenuBusinessPage } from '@/components/BusinessPage/Menu';

export default function Home() {
  return (
    <>
      <header>
        {/* <section className='w-full flex items-center justify-end gap-4 bg-red-800'>
          <Input
            isClearable
            type='email'
            label='Email'
            variant='bordered'
            placeholder='Enter your email'
            onClear={() => console.log('input cleared')}
            className='max-w-xs'
          />

          <Input
            label='Password'
            variant='bordered'
            placeholder='Enter your password'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
                aria-label='toggle password visibility'
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className='max-w-xs'
          />

          <Button
            color='primary'
            variant='ghost'
            isLoading={loading}
            onClick={() => setLoading(true)}
          >
            Iniciar Sesión
          </Button>
        </section> */}

        <MenuBusinessPage />
      </header>
      <main className='grow flex flex-col items-center justify-center gap-8 min-w-full min-h-full bg-gradient-to-r from-yellow-500 to-green-500'>
        <h1 className='text-3xl'>BookHub para negocios</h1>
      </main>
    </>
  );
}
