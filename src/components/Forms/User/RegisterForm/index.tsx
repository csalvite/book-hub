import { motion } from 'framer-motion';
import { Input } from '../../Input';
import { Separador } from '@/components/Separador';

export const RegisterForm = () => {
  return (
    <section className='h-[40rem] py-8 lg:h-[50rem] w-10/12 rounded-xl border border-black lg:w-6/12 xl:w-4/12 bg-white flex flex-col items-center justify-evenly text-zinc-950'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>Crear una cuenta</h1>
        <h2 className='text-xs'>
          Introduce tus datos para empezar a usar BookHub!
        </h2>
      </motion.div>
      <form className='w-10/12' onSubmit={() => {}}>
        <div className='h-full w-full flex flex-col items-center gap-6'>
          <Input label='Email' type='email' placeholder='Enter your email' />
          <Input
            label='Nombre y apellidos'
            type='text'
            placeholder='Nombre y apellidos'
          />
          <Input label='Contraseña' type='password' placeholder='Password' />
          <Input
            label='Número de teléfono'
            type='telf'
            placeholder='Número de teléfono'
          />
          <motion.button
            className='w-10/12 mt-4 text-slate-300 bg-black border border-black rounded p-2'
            whileHover={{ scale: [null, 1.1, 1.05] }}
            transition={{ duration: 0.3 }}
          >
            Continuar
          </motion.button>
        </div>
      </form>
      <Separador className='flex items-center gap-4 w-10/12' text='Or' />
      <motion.button
        className='border w-10/12 flex justify-center items-center gap-2 p-2 cursor-pointer'
        whileHover={{ backgroundColor: '#000', color: 'rgb(203 213 225)' }}
        transition={{ duration: 0.3 }}
      >
        <i className='fa-brands fa-google text-xl'></i> Google
      </motion.button>
    </section>
  );
};
