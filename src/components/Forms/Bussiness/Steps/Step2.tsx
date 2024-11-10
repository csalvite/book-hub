'use client';
import { Address } from '@/components/Forms/User/RegisterForm/Adress';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';
import { validateInput } from '@/utils/validation';

const Step2 = ({
  enterpriseData,
  updateEnterpriseData,
  nextStep,
  prevStep,
}: {
  enterpriseData: Partial<EnterpriseFormData>;
  updateEnterpriseData: (data: Partial<EnterpriseFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [formData, setFormData] = useState({
    address: enterpriseData.location?.address || '',
    addressNum: enterpriseData.location?.addressNum || '',
    city: enterpriseData.location?.city || '',
    state: enterpriseData.location?.state || '',
    zipCode: enterpriseData.location?.zipCode || '',
    country: enterpriseData.location?.country || '',
  });

  const [validation, setValidation] = useState({
    address: false,
    addressNum: false,
    city: false,
    state: false,
    zipCode: false,
    country: false,
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
        location: {
          address: formData.address,
          addressNum: formData.addressNum,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          latitude: 0,
          longitude: 0,
        },
      });
      nextStep();
    }
  };

  useEffect(() => {
    setFormData({
      address: enterpriseData.location?.address || '',
      addressNum: enterpriseData.location?.addressNum || '',
      city: enterpriseData.location?.city || '',
      state: enterpriseData.location?.state || '',
      zipCode: enterpriseData.location?.zipCode || '',
      country: enterpriseData.location?.country || '',
    });
  }, [enterpriseData]);

  return (
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
        formData={formData}
        validation={validation}
        handleInputChange={handleInputChange}
        prevStep={prevStep}
        nextStep={nextStep}
        onClick={submitDataOnNextStep}
      />
    </motion.div>
  );
};

export default Step2;
