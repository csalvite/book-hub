'use client';
import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/tooltip';
import { useEffect, useState } from 'react';
import {
  EnterpriseFormData,
  IBussinesType,
} from '@/interfaces/enterprise-form';
import { Input } from '../../../Input';
import Loader from '@/components/Loader';
import { getBusinessTypes } from '@/app/lib/data';
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
  const [invalid, setInvalid] = useState(false);
  const [businessType, setBusinessType] = useState<IBussinesType>({
    id: 0,
    name: '',
  });
  const [error, setError] = useState(false);

  const fetchBusinessType = async () => {
    setError(false);
    setInvalid(false);
    setLoading(true);
    try {
      const response: IBussinesType[] = await getBusinessTypes(type);
      if (response.length < 1) setError(true);
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
    setInvalid(false);
    setType(value);
  };

  const handleChangeBusinessType = (option: IBussinesType) => {
    setBusinessType({
      id: option.id,
      name: option.name,
    });
  };

  const submitDataOnNextStep = () => {
    if (!businessType.id) {
      setInvalid(true);
      return;
    }
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
        {/* <h3 className='my-8 text-xl'>Busca tu tipo de negocio</h3> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          className='relative w-full flex flex-col items-center justify-center border p-4 mb-2 cursor-pointer'
        >
          <label
            htmlFor='searchBusiness'
            className='text-sm block flex flex-col items-center justify-center'
          >
            <Tooltip
              showArrow={true}
              content='Selecciona solo un tipo'
              className='text-slate-900'
              // color='secondary'
            >
              <Button className='bg-transparent'>
                Busca tu tipo de negocio{' '}
                <i
                  className='fa-solid fa-info w-8 h-8 bg-slate-300 rounded-full'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></i>
              </Button>
            </Tooltip>
            {invalid && (
              <span className='text-red-400 text-sm'>
                Debes seleccionar un tipo de negocio para continuar
              </span>
            )}
          </label>
          <div className='w-full lg:w-8/12 flex items-center justify-center gap-4 cursor-pointer'>
            <Input
              id='searchBusiness'
              name='businessType'
              type='search'
              value={type}
              onChange={handleSearchBusinessType}
            />

            <Button
              onClick={() => fetchBusinessType()}
              className='bg-slate-200'
            >
              <i className='fa-solid fa-magnifying-glass'></i>
            </Button>
          </div>
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
        {error && <span>No se han encontrado resultados</span>}
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
