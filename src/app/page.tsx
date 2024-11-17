'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CardList } from '@/components/CardsList';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-w-full min-h-screen'>
      <div className='relative w-full h-dvh overflow-hidden flex flex-col gap-4 items-center justify-center'>
        <video
          className='absolute top-0 left-0 w-full h-dvh object-cover z-[-1] brightness-75'
          autoPlay
          muted
          loop
          controls={false}
        >
          <source src='/videos/background-video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <motion.div
          className='text-white relative z-10 text-[4rem]'
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          BookHub
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.4, delay: 0.2 }}
        >
          <Link href={'/auth/login'}>
            <p className='p-2 inline-block flex items-center justify-center gap-2'>
              <i className='fa-regular fa-circle-user text-2xl'></i>{' '}
              <span className='hover:underline'>Iniciar Sesión</span>
            </p>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.2 }}
        >
          <Link href={'/business'}>
            <p className='p-2 inline-block flex items-center justify-center gap-2'>
              <i className='fa-solid fa-shop text-2xl'></i>{' '}
              <span className='hover:underline'>Suma tu negocio!</span>
            </p>
          </Link>
        </motion.div>

        <motion.a
          className='text-4xl cursor-pointer absolute bottom-0 pb-16 animate-bounce'
          onClick={() => {
            const element = document.getElementById('cards');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <i className='fa-solid fa-angle-down'></i>
        </motion.a>
      </div>

      <section
        id='cards'
        className='container-cards w-full h-full p-8 overflow-y-none'
      >
        <CardList />
      </section>
    </main>
  );
}
