'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  EnterpriseFormData,
  IOpeningHoursSchedule,
} from '@/interfaces/enterprise-form';
import { Schedules } from '../../Schedules';
import type { TimeValue } from '@react-types/datepicker';

const Step5 = ({
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
  const [schedule, setSchedule] = useState<IOpeningHoursSchedule>({
    monday: {
      day: 'Lunes',
      schedule: '',
    },
    tuesday: {
      day: 'Martes',
      schedule: '',
    },
    wednesday: {
      day: 'Miércoles',
      schedule: '',
    },
    thursday: {
      day: 'Jueves',
      schedule: '',
    },
    friday: {
      day: 'Viernes',
      schedule: '',
    },
    saturday: {
      day: 'Sábado',
      schedule: '',
    },
    sunday: {
      day: 'Domingo',
      schedule: '',
    },
  });

  const handleChangeDaySchedule = (id: string, value: string) => {
    setSchedule((prevData) => {
      return {
        ...prevData,
        [id]: {
          ...prevData[id],
          schedule: value,
        },
      };
    });
  };

  const submitDataOnNextStep = () => {
    updateEnterpriseData({
      openingHours: {
        monday: schedule.monday.schedule,
        tuesday: schedule.tuesday.schedule,
        wednesday: schedule.wednesday.schedule,
        thursday: schedule.thursday.schedule,
        friday: schedule.friday.schedule,
        saturday: schedule.saturday.schedule,
        sunday: schedule.sunday.schedule,
      },
    });
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
        <h1 className='text-3xl mb-2'>Horarios</h1>
        <h2 className='text-xs text-center'>
          Indica el horario en el que podemos encargar tus servicios
        </h2>
      </motion.div>
      <div className='w-full h-[40rem] py-4 flex flex-col items-center overflow-y-scroll'>
        {/* {Object.values(schedule).map((day) => ( */}
        {Object.entries(schedule).map(([key, value]) => (
          <Schedules
            key={key}
            id={key}
            value={value}
            onChange={handleChangeDaySchedule}
          />
        ))}
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
          onClick={submitDataOnNextStep}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Step5;
