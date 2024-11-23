import { motion } from 'framer-motion';
import { EnterpriseFormData } from '@/interfaces/enterprise-form';
import { useEffect, useState } from 'react';
import { createBusiness } from '@/app/lib/data';
import Loader from '@/components/Loader';
import { Image } from '@nextui-org/react';
import Link from 'next/link';

const Step9 = ({ enterpriseData }: { enterpriseData: EnterpriseFormData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState();

  const submitCreateBusiness = async () => {
    try {
      const response = await createBusiness(enterpriseData);

      console.log('respuesta se ha creado un negocio?: ', response);

      setResume(response);
    } catch (error) {
      setError(true);
      console.error('Failed to create business: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submitted) {
      setSubmitted(true);
      submitCreateBusiness();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='py-4 w-full h-[80vh] flex flex-col justify-center items-center'
    >
      <div className='w-full h-full py-4 flex flex-col gap-8 items-center justify-center'>
        <Image
          width={300}
          height={200}
          alt='NextUI hero Image with delay'
          src='https://app.requestly.io/delay/500/https://nextui.org/images/hero-card-complete.jpeg'
        />
        <div className='flex justify-center'>
          {loading && (
            <div className='p-4'>
              <Loader className='w-12 h-12' />
            </div>
          )}

          {error && (
            <div className='p-4 flex flex-col items-center justify-center'>
              <h4>Ha ocurrido un error al crear el negocio :(</h4>
            </div>
          )}

          {!error && !loading && (
            <div className='w-[80%] text-center flex flex-col items-center justify-center gap-4'>
              <h2 className='text-2xl'>Negocio configurado correctamente!</h2>
              <p className='text-lg'>Gracias por confiar en bookhub</p>
              <p className='text-md'>
                Te ayudaremos a sacar el mayor potencial a tu negocio y que la
                gestión de reservas sea lo más amena posible.
              </p>
              <motion.button
                className='w-[80%] mt-16 text-slate-300 bg-black border border-black rounded p-2'
                whileHover={{ scale: [null, 1.1, 1.05] }}
                transition={{ duration: 0.3 }}
              >
                <Link href={'/dashboard'}>Continuar</Link>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Step9;
