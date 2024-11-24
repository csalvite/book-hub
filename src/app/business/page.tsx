'use client';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { EyeSlashFilledIcon } from '@/components/Forms/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/Forms/EyeFilledIcon';
import { useState } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <header className='flex gap-4 items-center justify-center bg-red-500'>
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
      </header>
      <main className='grow flex flex-col items-center justify-center gap-8 min-w-full min-h-full bg-gradient-to-r from-yellow-500 to-green-500'>
        <h1 className='text-3xl'>BookHub para negocios</h1>

        <Link href={'/auth/register/business'}>
          <p className='p-2 inline-block flex items-center justify-center gap-2'>
            <i className='fa-solid fa-shop text-2xl'></i>{' '}
            <span className='hover:underline'>Registra tu negocio</span>
          </p>
        </Link>
      </main>
    </>
  );
}
