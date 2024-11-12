import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';
import {
  EnterpriseFormData,
  IOptionServices,
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
  const [options, setOptions] = useState<IOptionServices[]>([]);
  const [servicesSelected, setServicesSelected] = useState<IOptionServices[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] =
    useState<IOptionServices | null>(null);
  const [open, setOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response: IServicesRecommended[] = await getServicesRecommended(
        enterpriseData.business?.type
      );

      const optionServices = response.map((res) => {
        return {
          ...res,
          description: '',
          duration: '00:00',
          price: 0,
        };
      });

      setOptions(optionServices);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service: IOptionServices) => {
    setSelectedService(service);
    setOpen(true);
  };

  const addServiceSelected = (option: IOptionServices) => {
    setServicesSelected((prevData) => {
      if (
        prevData.filter((service) => service.name === option.name).length > 0
      ) {
        //si ya existía se modificamos sus valores
        return prevData.map((service) => {
          if (service.id === option.id) {
            return {
              ...service,
              description: option.description,
              duration: option.duration,
              price: option.price,
            };
          }

          return service;
        });
      }

      // si no se añade
      return [...prevData, option];
    });
  };

  const handleCloseModalDropService = (option: IOptionServices) => {
    setServicesSelected((prevData) => {
      return prevData.filter((service) => service.name !== option.name);
    });
  };

  useEffect(() => {
    if (enterpriseData.business && enterpriseData.business.type) {
      fetchServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseData.business?.type]);

  console.log('servicesSelected: ', servicesSelected);
  console.log('servicio: ', selectedService);

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
          <Tooltip
            showArrow={true}
            content='Puedes terminar de establecer los servicios más adelante'
            className='text-slate-900'
            // color='secondary'
          >
            <Button className='bg-transparent text-xs text-center'>
              Selecciona y establece precios para tus servicios
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
                  onClick={() => {
                    handleOpenModal(option);
                  }}
                  className='w-8/12 flex items-center justify-start gap-4 border p-4 mt-4 hover:border-black cursor-pointer'
                >
                  <input
                    id={option.name}
                    type='checkbox'
                    checked={
                      servicesSelected.filter(
                        (service) => service.name === option.name
                      ).length > 0
                        ? true
                        : false
                    }
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
        <ServiceModal
          service={selectedService}
          open={open}
          setOpen={setOpen}
          onClick={addServiceSelected}
          closeModal={handleCloseModalDropService}
        />
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
