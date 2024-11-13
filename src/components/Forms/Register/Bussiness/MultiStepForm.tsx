'use client';
import { useEffect, useState } from 'react';
import {
  EnterpriseFormData,
  IBussinesType,
} from '@/interfaces/enterprise-form';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';

const ProgressBar = ({ step }: { step: number }) => (
  <div className='flex justify-center items-center space-x-4'>
    {[1, 2, 3, 4, 5, 6].map((num) => (
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
      type: 0,
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
      addressNum: '',
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
    services: [],
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

  const updateEnterpriseDataType = (type: number) => {
    setEnterpriseData({
      ...enterpriseData,
      business: {
        ...enterpriseData.business,
        type: type,
      },
    });
  };

  console.log('enterpriseData: ', enterpriseData);

  return (
    <section className='w-11/12 lg:w-8/12 xl:w-6/12 2xl:w-4/12 h-[90dvh] max-h-dvh md:h-4/5 text-zinc-950 flex flex-col items-center mx-auto bg-white p-2 py-4 md:p-8 shadow-lg rounded-xl'>
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
        />
      )}
      {step === 2 && (
        <Step2
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <Step4
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseDataType}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 5 && (
        <Step5
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 6 && (
        <Step6
          enterpriseData={enterpriseData}
          updateEnterpriseData={updateEnterpriseData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      <ProgressBar step={step} />
    </section>
  );
}
