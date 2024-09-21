'use client';
import { Input } from '@/components/Forms/Input';
import { Separador } from '@/components/Separador';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className='h-[50rem] w-10/12 rounded-xl border border-black lg:w-6/12 xl:w-4/12 bg-white flex flex-col items-center justify-evenly text-zinc-950'>
      <div className='cn-w-full flex flex-col items-center'>
        <h1 className='text-3xl mb-2'>BookHub</h1>
        <h2 className='text-xs'>Donde quieras, cuando quieras</h2>
      </div>
      <div className='w-10/12'>
        <div className='h-full flex flex-col items-center gap-6'>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            className='w-full'
          >
            <Input label='Email' placeholder='Enter your email' />
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3, delay: 0.2 }}
            className='w-full'
          >
            <Input
              label='Password'
              type='pass'
              placeholder='Enter your password'
            />
            <p className='text-xs mt-2 text-right'>
              Has olvidado la contraseña?{' '}
              <span className='underline font-semibold cursor-pointer'>
                Cambiala ahora
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3, delay: 0.4 }}
            className='w-full text-center'
          >
            <motion.button
              className='w-10/12 mt-4 text-slate-300 bg-black border border-black rounded p-2'
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Separador className='flex items-center gap-4 w-10/12' text='Or' />
    </section>
  );
}
