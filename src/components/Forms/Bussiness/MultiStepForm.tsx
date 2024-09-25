'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/Forms/User/RegisterForm';
import { Address } from '../User/RegisterForm/Adress';
import dynamic from 'next/dynamic';

// Importa el componente Map de manera dinámica y desactiva SSR
const Mapa = dynamic(() => import('@/components/Maps/Mapa'), { ssr: false });

const Step1 = ({ nextStep }: { nextStep: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='py-4 w-full h-full flex justify-center'
  >
    <RegisterForm
      title='Crea un negocio'
      business={true}
      className='h-[40rem] py-8 sm:h-[50rem] w-full rounded-xl border border-black md:w-full bg-white flex flex-col items-center justify-evenly text-zinc-950'
      onClick={nextStep}
    />
    ;
  </motion.div>
);

const Step2 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='py-4 w-full h-full flex justify-center'
  >
    <Address
      title='Dirección'
      business={true}
      prevStep={prevStep}
      nextStep={nextStep}
    />
    ;
  </motion.div>
);

const Step3 = ({ prevStep }: { prevStep: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='py-4 w-full h-full flex flex-col justify-center items-center'
  >
    <Mapa location={'Noia'} />
    <motion.button
      className='w-full mt-4 text-slate-300 bg-white text-black border border-black rounded p-2'
      whileHover={{ scale: [null, 1.1, 1.05] }}
      transition={{ duration: 0.3 }}
      onClick={() => prevStep()}
    >
      Atrás
    </motion.button>
  </motion.div>
);

const ProgressBar = ({ step }: { step: number }) => (
  <div className='flex justify-center items-center space-x-4'>
    {[1, 2, 3].map((num) => (
      <div key={num} className='flex flex-col items-center'>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {num}
        </div>
      </div>
    ))}
  </div>
);

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className='w-11/12 lg:w-8/12 xl:w-6/12 2xl:w-4/12 h-4/5 flex flex-col items-center mx-auto bg-white p-8 shadow-lg rounded-xl'>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 prevStep={prevStep} />}
      <ProgressBar step={step} />
    </div>
  );
}
