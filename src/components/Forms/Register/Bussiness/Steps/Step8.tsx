import { motion } from 'framer-motion';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';
import { FileInputCard } from '@/components/Forms/FileInputCard';
import { useState } from 'react';

const Step8 = ({
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
  const [imagePreview, setImagePreview] = useState<string>('');

  // TODO: PENDIENTE COMPROBAR SI EL BACKEND ESPERA UN BASE64 O UN ARCHIVO
  const submitDataOnNextStep = () => {
    updateEnterpriseData({
      images: {
        hero: imagePreview,
        additionalImages: [],
      },
    });
    nextStep();
  };

  console.log(imagePreview);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='py-4 w-full h-[80vh] flex flex-col justify-center items-center'
    >
      <div className='w-full h-full py-4 flex flex-col items-center justify-center'>
        <FileInputCard
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      </div>

      <div className='w-full flex gap-4'>
        <motion.button
          className='w-full mt-4 text-slate-300 bg-white text-black border border-black rounded p-2'
          whileHover={{ scale: [null, 1.1, 1.05] }}
          transition={{ duration: 0.3 }}
          onClick={prevStep}
        >
          Atrás
        </motion.button>

        <motion.button
          className='w-full mt-4 text-slate-300 bg-black border border-black rounded p-2'
          whileHover={{ scale: [null, 1.1, 1.05] }}
          transition={{ duration: 0.3 }}
          onClick={submitDataOnNextStep}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step8;
