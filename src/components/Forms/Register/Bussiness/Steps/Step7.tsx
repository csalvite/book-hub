import { motion } from 'framer-motion';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';

const Step7 = ({
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
  // const submitDataOnNextStep = () => {
  //   updateEnterpriseData({
  //     services: servicesSelected,
  //   });
  //   nextStep();
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='py-4 w-full h-[80vh] flex flex-col justify-center items-center'
    >
      <motion.div className='w-full flex flex-col items-center'>
        <h1 className='text-3xl mb-2'>Resumen Servicios Seleccionados</h1>
        <h2 className='text-xs text-center'>
          Estes son los servicios que has seleccionado!
        </h2>
      </motion.div>

      <div className='w-full h-[80%] py-4 flex flex-col items-center'>
        <div className='flex items-center gap-4'>
          <i
            className='fa-solid fa-info w-8 h-8 bg-slate-300 rounded-full'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></i>
          <p className='text-sm'>
            Recuerda que puedes seleccionar más adelante más servicios o editar
            los ya incluidos.
          </p>
        </div>
        {enterpriseData?.services &&
          enterpriseData?.services?.length > 0 &&
          enterpriseData.services?.map((service, index) => {
            return (
              <motion.div
                key={index}
                className='w-8/12 flex flex-col justify-center gap-4 border p-4 mt-4 border-black'
              >
                <h3 className='text-xl'>{service.name}</h3>
                <div className='flex justify-evenly'>
                  <p className='flex gap-2 items-center'>
                    <i className='fa-regular fa-clock text-2xl'></i>
                    {service.duration}h
                  </p>
                  <p className='flex gap-2 items-center'>
                    <i className='fa-solid fa-euro-sign text-2xl'></i>
                    {service.price}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
          onClick={() => nextStep()}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step7;
