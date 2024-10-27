'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';

const Step4 = ({
  prevStep,
  nextStep,
  enterpriseData,
  updateEnterpriseData,
}: {
  prevStep: () => void;
  nextStep: () => void;
  enterpriseData: Partial<EnterpriseFormData>;
  updateEnterpriseData: (data: Partial<EnterpriseFormData>) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='py-4 w-full h-full flex flex-col justify-center items-center'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <h1 className='text-3xl mb-2'>Ya casi estamos</h1>
        <h2 className='text-xs text-center'>Cuentanos más sobre tu negocio</h2>
      </motion.div>
      <div className='w-full h-full py-4 flex flex-col items-center'>
        <h3 className='my-8 text-xl'>
          Cuáles son los servicios que ofrece tu negocio?
        </h3>
        {/* aqui mapeo del get de servicios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
        >
          <input
            id='estetica'
            type='checkbox'
            className=''
            name='estetica'
            value={'Estética'}
          />
          <label htmlFor='estetica' className='text-lg'>
            Estética
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
        >
          <input
            id='fisioterapia'
            type='checkbox'
            className=''
            name='estetica'
            value={'Fisioterapia'}
          />
          <label htmlFor='fisioterapia' className='text-lg'>
            Fisioterapia
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
        >
          <input
            id='restaurante'
            type='checkbox'
            className=''
            name='estetica'
            value={'Restaurante'}
          />
          <label htmlFor='restaurante' className='text-lg'>
            Restaurante
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
        >
          <input
            id='cafeteria'
            type='checkbox'
            className=''
            name='estetica'
            value={'Cafetería'}
          />
          <label htmlFor='cafeteria' className='text-lg'>
            Cafetería
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
        >
          <input
            id='deportes'
            type='checkbox'
            className=''
            name='estetica'
            value={'Deportes'}
          />
          <label htmlFor='deportes' className='text-lg'>
            Deportes
          </label>
        </motion.div>
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
    </motion.div>
  );
};

export default Step4;
