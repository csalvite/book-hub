'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/Forms/User/RegisterForm';
import { Address } from '../User/RegisterForm/Adress';
import dynamic from 'next/dynamic';
import { ToggleSwitch } from '../ToggleSwitch';
import { EnterpriseFormData, IOpeningHours } from '@/types/enterprise-form';

// Importa el componente Map de manera dinámica y desactiva SSR
const Mapa = dynamic(() => import('@/components/Maps/Mapa'), { ssr: false });

const Step1 = ({
  nextStep,
  enterpriseData,
  updateEnterpriseData,
}: {
  nextStep: () => void;
  enterpriseData: Partial<EnterpriseFormData>;
  updateEnterpriseData: (data: Partial<EnterpriseFormData>) => void;
}) => {
  const [formData, setFormData] = useState({
    name: enterpriseData.business?.name || '',
    type: enterpriseData.business?.type || '',
    password: enterpriseData.business?.password || '',
    ownerName: enterpriseData.business?.owner.name || '',
    ownerMail: enterpriseData.business?.owner.mail || '',
    ownerPhone: enterpriseData.business?.owner.phone || '',
    prefix: enterpriseData.business?.owner.prefix || '',
  });

  const handleInputChange = (
    e?: React.ChangeEvent<HTMLInputElement>,
    prefixName?: string,
    prefixValue?: string
  ) => {
    let property: string;
    let propValue: string;
    if (e) {
      const { name, value } = e.target;

      property = name;
      propValue = value;
    } else {
      property = prefixName || '';
      propValue = prefixValue || '';
    }

    setFormData({
      ...formData,
      [property]: propValue,
    });
  };

  const submitDataOnNextStep = () => {
    updateEnterpriseData({
      business: {
        name: formData.name,
        type: '',
        password: formData.password,
        owner: {
          name: formData.ownerName,
          mail: formData.ownerMail,
          phone: formData.ownerPhone,
          prefix: formData.prefix,
        },
      },
    });
    nextStep();
  };

  useEffect(() => {
    setFormData({
      name: enterpriseData.business?.name || '',
      type: enterpriseData.business?.type || '',
      password: enterpriseData.business?.password || '',
      ownerName: enterpriseData.business?.owner.name || '',
      ownerMail: enterpriseData.business?.owner.mail || '',
      ownerPhone: enterpriseData.business?.owner.phone || '',
      prefix: enterpriseData.business?.owner.prefix || '',
    });
  }, [enterpriseData]);

  console.log(formData);

  return (
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
        formData={formData}
        handleInputChange={handleInputChange}
        className='h-[80vh] py-8 w-full rounded-xl border border-black md:w-full bg-white flex flex-col items-center justify-evenly text-zinc-950'
        onClick={submitDataOnNextStep}
      />
      ;
    </motion.div>
  );
};

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

const Step5 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const opening = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

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
        <h1 className='text-3xl mb-2'>Horarios</h1>
        <h2 className='text-xs text-center'>
          Indica el horario en el que podemos encargar tus servicios
        </h2>
      </motion.div>
      <div className='w-full h-full py-4 flex flex-col items-center'>
        {opening.map((day) => (
          <ToggleSwitch key={day} id={day} />
        ))}
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

const ProgressBar = ({ step }: { step: number }) => (
  <div className='flex justify-center items-center space-x-4'>
    {[1, 2, 3, 4, 5].map((num) => (
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
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseFormData>({
    business: {
      name: '',
      type: '',
      password: '',
      owner: {
        name: '',
        mail: '',
        phone: '',
        prefix: '',
      },
    },
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      latitude: 0,
      longitude: 0,
    },
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    services: [
      {
        name: '',
        type: '',
        description: '',
        price: 0,
        duration: 0,
      },
    ],
    images: {
      hero: '',
      additionalImages: [],
    },
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateEnterpriseData = (data: Partial<EnterpriseFormData>) => {
    setEnterpriseData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <div className='w-11/12 lg:w-8/12 xl:w-6/12 2xl:w-4/12 h-4/5 text-zinc-950 flex flex-col items-center mx-auto bg-white p-2 py-4 md:p-8 shadow-lg rounded-xl'>
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
        />
      )}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
      {step === 4 && <Step4 prevStep={prevStep} nextStep={nextStep} />}
      {step === 5 && <Step5 prevStep={prevStep} nextStep={nextStep} />}
      <ProgressBar step={step} />
    </div>
  );
}
