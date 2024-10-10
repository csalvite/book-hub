import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center gap-8 min-w-full min-h-screen bg-gradient-to-r from-yellow-500 to-green-500'>
      <h1 className='text-3xl'>BookHub para negocios</h1>
      <Link href={'/auth/register/business'}>
        <p className='p-2 inline-block flex items-center justify-center gap-2'>
          <i className='fa-solid fa-shop text-2xl'></i>{' '}
          <span className='hover:underline'>
            Inicia Sesión o Registra tu negocio
          </span>
        </p>
      </Link>
    </main>
  );
}
