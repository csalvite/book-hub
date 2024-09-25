import { motion } from 'framer-motion';
import { Input } from '../../Input';
import { Separador } from '@/components/Separador';

export const Address = ({
  title,
  business,
  prevStep,
  nextStep,
}: {
  title: string;
  business: boolean;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  return (
    <section className='h-[40rem] py-8 sm:h-[50rem] rounded-xl border border-black w-full bg-white flex flex-col items-center justify-evenly text-zinc-950'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>{title}</h1>
        <h2 className='text-xs'>Donde pueden encontrarte tus clientes</h2>
      </motion.div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='w-10/12'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='h-full w-full flex flex-col items-center gap-4'>
          <div className='w-full flex gap-4'>
            <Input
              label='Dirección'
              type='text'
              className='grow'
              placeholder='Nombre de calle o avenida'
            />
            <Input label='Número' type='number' placeholder='Número de calle' />
          </div>
          <Input label='Ciudad' type='text' placeholder='Ciudad' />
          <Input label='Provincia' type='text' placeholder='Provincia' />
          <div className='w-full flex gap-4'>
            <Input
              label='Código postal'
              type='text'
              placeholder='Código postal'
            />
            <Input label='País' type='text' placeholder='País' />
          </div>
          <div className='w-full flex gap-4'>
            <motion.button
              className='w-full mt-4 text-slate-300 bg-white text-black border border-black rounded p-2'
              whileHover={{ scale: [null, 1.1, 1.05] }}
              transition={{ duration: 0.3 }}
              onClick={() => prevStep()}
            >
              Atrás
            </motion.button>
            <motion.button
              className='w-full mt-4 text-slate-300 bg-black border border-black rounded p-2'
              whileHover={{ scale: [null, 1.1, 1.05] }}
              transition={{ duration: 0.3 }}
              onClick={() => nextStep()}
            >
              Continuar
            </motion.button>
          </div>
        </div>
      </motion.form>
      {!business && (
        <>
          <Separador className='flex items-center gap-4 w-10/12' text='Or' />
          <motion.button
            className='border w-10/12 flex justify-center items-center gap-2 p-2 cursor-pointer'
            whileHover={{ backgroundColor: '#000', color: 'rgb(203 213 225)' }}
            transition={{ duration: 0.3 }}
          >
            <i className='fa-brands fa-google text-xl'></i> Google
          </motion.button>
        </>
      )}
    </section>
  );
};
