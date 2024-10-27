'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';
import dynamic from 'next/dynamic';

// Importa el componente Map de manera dinámica y desactiva SSR
const Mapa = dynamic(() => import('@/components/Maps/Mapa'), { ssr: false });

const Step3 = ({
  enterpriseData,
  updateEnterpriseData,
  prevStep,
  nextStep,
}: {
  enterpriseData: Partial<EnterpriseFormData>;
  updateEnterpriseData: (data: Partial<EnterpriseFormData>) => void;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const [formData, setFormData] = useState({
    latitude: enterpriseData?.location?.latitude || '',
    longitude: enterpriseData?.location?.longitude || '',
  });

  const [direction, setDirection] = useState('');

  const submitDataOnNextStep = () => {
    updateEnterpriseData({
      location: {
        ...enterpriseData.location,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },
    });
    nextStep();
  };

  useEffect(() => {
    setDirection(
      `${enterpriseData?.location?.zipCode}, ${enterpriseData?.location?.city}, ${enterpriseData?.location?.country}`
    );
  }, [enterpriseData?.location]);

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
        <h1 className='text-3xl mb-2'>Tu Dirección</h1>
        <h2 className='text-xs text-center'>Es esta tu dirección?</h2>
      </motion.div>
      <div className='w-full h-full py-4'>
        <Mapa location={direction} setFormData={setFormData} />
      </div>
      <p className='text-xs text-zinc-500'>
        Puedes modificar tu dirección exacta en este mapa
      </p>
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
          onClick={() => submitDataOnNextStep()}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step3;
