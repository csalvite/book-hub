import { motion } from 'framer-motion';
import { Input } from '../../Input';
import { Separador } from '@/components/Separador';

export const Address = ({
  title,
  business,
  formData,
  handleInputChange,
  prevStep,
  nextStep,
  onClick,
}: {
  title: string;
  business: boolean;
  formData: any;
  handleInputChange: any;
  prevStep: () => void;
  nextStep: () => void;
  onClick: () => void;
}) => {
  return (
    <section className='h-[80vh] py-8 rounded-xl border border-black w-full bg-white flex flex-col items-center justify-evenly text-zinc-950'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>{title}</h1>
        <h2 className='text-xs text-center'>
          Donde pueden encontrarte tus clientes
        </h2>
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
              name='address'
              value={formData['address'] || ''}
              onChange={handleInputChange}
              className='grow w-full'
              placeholder='Nombre de calle o avenida'
            />
            <Input
              label='Número'
              type='number'
              name='addressNum'
              value={formData['addressNum'] || ''}
              onChange={handleInputChange}
              className='w-16'
              placeholder='Nº'
            />
          </div>
          <Input
            label='Ciudad'
            type='text'
            name='city'
            value={formData['city'] || ''}
            onChange={handleInputChange}
            placeholder='Ciudad'
          />
          <Input
            label='Provincia'
            type='text'
            name='state'
            value={formData['state'] || ''}
            onChange={handleInputChange}
            placeholder='Provincia'
          />
          <div className='w-full flex gap-4'>
            <Input
              label='Código postal'
              type='text'
              name='zipCode'
              value={formData['zipCode'] || ''}
              onChange={handleInputChange}
              placeholder='Código postal'
            />
            <Input
              label='País'
              type='text'
              name='country'
              value={formData['country'] || ''}
              onChange={handleInputChange}
              placeholder='País'
            />
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
              onClick={() => onClick()}
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
