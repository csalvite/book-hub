'use client';
import { RegisterForm } from '@/components/Forms/User/RegisterForm';

export default function Home() {
  return (
    <RegisterForm
      title='Crear una cuenta'
      business={false}
      className='h-[40rem] py-8 sm:h-[50rem] w-11/12 rounded-xl border border-black lg:w-6/12 xl:w-4/12 bg-white flex flex-col items-center justify-evenly text-zinc-950'
      onClick={() => {}}
    />
  );
}
