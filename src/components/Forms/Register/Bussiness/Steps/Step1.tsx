'use client';
import { RegisterForm } from '@/components/Forms/User/RegisterForm';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  EnterpriseFormData,
  IOpeningHours,
} from '@/interfaces/enterprise-form';
import { validateInput } from '@/utils/validation';

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
  const [validation, setValidation] = useState({
    name: false,
    password: false,
    ownerName: false,
    ownerMail: false,
    ownerPhone: false,
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
    const newValidation = { ...validation };
    let allValid = true;

    for (const key in formData) {
      if (key === 'type') continue;

      // Convertimos key al tipo correcto
      const typedKey = key as keyof typeof formData;
      const value = formData[typedKey];
      const isValid = validateInput(typedKey, String(value));
      newValidation[typedKey as keyof typeof validation] = !isValid;
      if (!isValid) allValid = false;
    }

    setValidation(newValidation);

    if (allValid) {
      updateEnterpriseData({
        business: {
          name: formData.name,
          type: 0,
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
    }
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
        validation={validation}
        handleInputChange={handleInputChange}
        className='h-[80vh] py-8 w-full rounded-xl border border-black md:w-full bg-white flex flex-col items-center justify-evenly text-zinc-950'
        onClick={submitDataOnNextStep}
      />
      ;
    </motion.div>
  );
};

export default Step1;
