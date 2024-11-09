import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnterpriseFormData,
  IServicesRecommended,
} from '@/interfaces/enterprise-form';
import Loader from '@/components/Loader';
import { getServicesRecommended } from '@/app/lib/data';
import { ServiceModal } from '../../ServiceModal';

const Step6 = ({
  prevStep,
  nextStep,
  enterpriseData,
}: {
  prevStep: () => void;
  nextStep: () => void;
  enterpriseData: Partial<EnterpriseFormData>;
}) => {
  const [type, setType] = useState('');
  const [options, setOptions] = useState<IServicesRecommended[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] =
    useState<IServicesRecommended | null>(null);
  const [open, setOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response: IServicesRecommended[] = await getServicesRecommended(
        7937
      );
      setOptions(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service: IServicesRecommended) => {
    setSelectedService(service);
    setOpen(true);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='py-4 w-full h-[80vh] flex flex-col justify-center items-center'
    >
      <motion.div className='w-full flex flex-col items-center'>
        <h1 className='text-3xl mb-2'>Servicios</h1>
        <h2 className='text-xs text-center'>
          Selecciona y establece precios para tus servicios
        </h2>
      </motion.div>

      <div className='w-full h-[80%] py-4 flex flex-col items-center'>
        {loading ? (
          <div className='p-4'>
            <Loader className='w-12 h-12' />
          </div>
        ) : (
          options.length > 0 && (
            <div className='w-full py-4 flex flex-col items-center overflow-y-scroll'>
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleOpenModal(option)}
                  className='w-8/12 flex items-center justify-start gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
                >
                  <input
                    id={option.name}
                    type='checkbox'
                    name={option.name}
                    value={option.name}
                    onChange={() => {}}
                  />
                  <label htmlFor={option.name} className='text-lg'>
                    {option.name}
                  </label>
                </motion.div>
              ))}
            </div>
          )
        )}
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} open={open} setOpen={setOpen} />
      )}

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
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step6;
