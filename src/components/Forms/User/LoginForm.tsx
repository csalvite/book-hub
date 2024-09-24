import { Input } from '@/components/Forms/Input';
import { Separador } from '@/components/Separador';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const LoginForm = () => {
  return (
    <section className='h-[40rem] py-8 lg:h-[50rem] w-10/12 rounded-xl border border-black lg:w-6/12 xl:w-4/12 bg-white flex flex-col items-center justify-evenly text-zinc-950'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>BookHub</h1>
        <h2 className='text-xs'>Donde quieras, cuando quieras</h2>
      </motion.div>
      <form className='w-10/12' onSubmit={(e) => {}}>
        <div className='h-full flex flex-col items-center gap-6'>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            className='w-full'
          >
            <Input label='Email' type='email' placeholder='Enter your email' />
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.3, delay: 0.1 }}
            className='w-full'
          >
            <Input
              label='Password'
              type='password'
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
            transition={{ ease: 'easeOut', duration: 0.3, delay: 0.15 }}
            className='w-full text-center'
          >
            <motion.button
              className='w-full md:w-10/12 mt-4 text-slate-300 bg-black border border-black rounded p-2'
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>
      </form>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3, delay: 0.2 }}
        className='w-full flex justify-center items-center'
      >
        <Separador className='flex items-center gap-4 w-10/12' text='Or' />
      </motion.div>
      <div className='flex flex-col gap-4 w-10/12 items-center'>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3, delay: 0.25 }}
          className='w-full flex justify-center items-center'
        >
          <motion.button
            className='border w-full md:w-10/12 flex justify-center items-center gap-2 p-2 cursor-pointer'
            whileHover={{ backgroundColor: '#000', color: 'rgb(203 213 225)' }}
            transition={{ duration: 0.3 }}
          >
            <i className='fa-brands fa-google text-xl'></i> Google
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3, delay: 0.3 }}
          className='w-full flex justify-center items-center'
        >
          No tienes cuenta?{' '}
          <Link
            href={'/auth/register/user'}
            className='inline-block hover:underline cursor-pointer ml-2'
          >
            Regístrate
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
