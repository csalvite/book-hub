import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center gap-8 min-w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className='text-3xl'>BookHub</h1>
      <Link href={'/auth/login'}>
        <p className='p-2 inline-block flex items-center justify-center gap-2'>
          <i className='fa-regular fa-circle-user text-2xl'></i>{' '}
          <span className='hover:underline'>Iniciar Sesión</span>
        </p>
      </Link>

      <Link href={'/business'}>
        <p className='p-2 inline-block flex items-center justify-center gap-2'>
          <i className='fa-solid fa-shop text-2xl'></i>{' '}
          <span className='hover:underline'>Suma tu negocio!</span>
        </p>
      </Link>
    </main>
  );
}
