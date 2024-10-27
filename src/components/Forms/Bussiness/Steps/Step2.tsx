'use client';
import { Address } from '@/components/Forms/User/RegisterForm/Adress';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';

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
        handleInputChange={handleInputChange}
        prevStep={prevStep}
        nextStep={nextStep}
        onClick={submitDataOnNextStep}
      />
    </motion.div>
  );
};

export default Step2;
