'use client';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import {
  EnterpriseFormData,
  IBussinesType,
} from '@/interfaces/enterprise-form';
import { Input } from '../../Input';
import Loader from '@/components/Loader';
import { fetchApiPrueba } from '@/app/lib/data';
import { Button } from '@nextui-org/button';

const Step4 = ({
  prevStep,
  nextStep,
  enterpriseData,
  updateEnterpriseData,
}: {
  prevStep: () => void;
  nextStep: () => void;
  enterpriseData: Partial<EnterpriseFormData>;
  updateEnterpriseData: (type: number) => void;
}) => {
  const [type, setType] = useState('');
  const [typeOptions, setTypesOptions] = useState<IBussinesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState<IBussinesType>({
    id: 0,
    name: '',
  });

  const fetchBusinessType = async () => {
    setLoading(true);
    try {
      const response = await fetchApiPrueba(type);
      setTypesOptions(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBusinessType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setType(value);
  };

  const handleChangeBusinessType = (option: IBussinesType) => {
    setBusinessType({
      id: option.id,
      name: option.name,
    });
  };

  const submitDataOnNextStep = () => {
    updateEnterpriseData(businessType.id);
    nextStep();
  };

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
        <h3 className='my-8 text-xl'>Busca tu tipo de negocio</h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='w-8/12 flex items-center justify-center gap-4 border p-4 mt-4 cursor-pointer'
        >
          <Input
            name='businessType'
            type='search'
            value={type}
            onChange={handleSearchBusinessType}
          />

          <Button onClick={() => fetchBusinessType()} className='bg-slate-200'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </Button>
        </motion.div>

        {loading ? (
          <div className='p-4'>
            <Loader className='w-12 h-12' />
          </div>
        ) : (
          typeOptions.length > 0 && (
            <div className='w-full h-96 py-4 flex flex-col items-center overflow-y-scroll'>
              {typeOptions?.map((option) => {
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                    onClick={() => handleChangeBusinessType(option)}
                    className={`w-8/12 flex items-center justify-start gap-4 border p-4 mt-4 hover:border-black cursor-pointer ${
                      businessType?.id === option.id ? 'border-black' : ''
                    }`}
                  >
                    <input
                      id={option.name}
                      type='checkbox'
                      className=''
                      name={option.name}
                      value={option.name}
                      onChange={() => {}}
                      checked={businessType?.id === option.id ? true : false}
                    />
                    <label htmlFor={option.name} className='text-lg'>
                      {option.name}
                    </label>
                  </motion.div>
                );
              })}
            </div>
          )
        )}
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
          onClick={() => submitDataOnNextStep()}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step4;
