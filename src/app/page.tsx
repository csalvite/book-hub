import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className='text-3xl'>BookHub</h1>
      <Link href={'/auth/register/user'}>
        <p className='p-2 inline-block hover:underline'>
          No tienes una cuenta? Regístrate
        </p>
      </Link>
      <br />
      <Link href={'/auth/register/business'}>
        <p className='p-2 inline-block hover:underline'>
          Ah pero eres empresa y quieres darte de alta? Regístrate
        </p>
      </Link>
    </main>
  );
}
