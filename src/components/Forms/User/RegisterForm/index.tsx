import { motion } from 'framer-motion';
import { Input } from '../../Input';
import { Separador } from '@/components/Separador';
import React, { useEffect, useState } from 'react';

export const RegisterForm = ({
  title,
  business,
  className,
  formData,
  handleInputChange,
  onClick,
}: {
  title: string;
  business: boolean;
  className: string;
  formData: any;
  handleInputChange: any;
  onClick: () => void;
}) => {
  const [prefix, setPrefix] = useState('+34');

  useEffect(() => {
    handleInputChange(null, 'prefix', prefix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  return (
    <section className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>{title}</h1>
        <h2 className='text-xs text-center'>
          Introduce tus datos para empezar a usar BookHub!
        </h2>
      </motion.div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='w-10/12'
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div className='h-full w-full flex flex-col items-center gap-4'>
          {business && (
            <Input
              label='Nombre del negocio'
              type='text'
              name='name'
              value={formData['name']}
              onChange={handleInputChange}
              placeholder='Introduce el nombre de tu negocio'
            />
          )}
          <Input
            label='Email'
            type='email'
            name='ownerMail'
            value={formData['ownerMail']}
            onChange={handleInputChange}
            placeholder='Enter your email'
          />
          <Input
            label='Nombre y apellidos'
            type='text'
            name='ownerName'
            value={formData['ownerName']}
            onChange={handleInputChange}
            placeholder='Nombre y apellidos'
          />
          <Input
            label='Contraseña'
            type='password'
            placeholder='Password'
            value={formData['password']}
            name='password'
            onChange={handleInputChange}
          />
          <Input
            label='Número de teléfono'
            type='telf'
            name='ownerPhone'
            value={formData['ownerPhone']}
            onChange={handleInputChange}
            prefix={formData['prefix']}
            setPrefix={setPrefix}
            placeholder='Número de teléfono'
          />
          <motion.button
            className='w-full mt-4 text-slate-300 bg-black border border-black rounded p-2'
            whileHover={{ scale: [null, 1.1, 1.05] }}
            transition={{ duration: 0.3 }}
          >
            Continuar
          </motion.button>
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
