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
    transition={{ ease: 'easeOut', duration: 0.3 }}
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
    transition={{ ease: 'easeOut', duration: 0.3 }}
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

const Step3 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => (
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
      <Mapa location={'Noia'} />
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
        onClick={() => nextStep()}
      >
        Continuar
      </motion.button>
    </div>
  </motion.div>
);

const Step4 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => (
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
    <div className='w-full h-full py-4'>
      <motion.select
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        className='cn-w-full flex flex-col items-center'
      >
        <motion.option>Opcion 1</motion.option>
        <motion.option>Opcion 2</motion.option>
        <motion.option>Opcion 3</motion.option>
        <motion.option>Opcion 4</motion.option>
      </motion.select>
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

const ProgressBar = ({ step }: { step: number }) => (
  <div className='flex justify-center items-center space-x-4'>
    {[1, 2, 3, 4].map((num) => (
      <div key={num} className='flex flex-col items-center'>
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center ${
            step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}
        ></div>
      </div>
    ))}
  </div>
);

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className='w-11/12 lg:w-8/12 xl:w-6/12 2xl:w-4/12 h-4/5 text-zinc-950 flex flex-col items-center mx-auto bg-white p-2 py-4 md:p-8 shadow-lg rounded-xl'>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
      {step === 4 && <Step4 prevStep={prevStep} nextStep={nextStep} />}
      <ProgressBar step={step} />
    </div>
  );
}
