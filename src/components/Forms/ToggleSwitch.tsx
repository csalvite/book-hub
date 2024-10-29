import { TimeInput } from '@nextui-org/date-input';
import { useState } from 'react';
import { Button } from '@nextui-org/react';

interface IToggleSwitch {
  id: string;
}

interface ISchedules {
  opening: string;
  closure: string;
}

export const ToggleSwitch = ({ id }: IToggleSwitch) => {
  const [checked, setChecked] = useState(false);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);

  return (
    <div className='w-4/5 py-2 flex gap-4 items-center justify-start'>
      <div className='flex flex-col items-center'>
        <span className='text-sm'>{id}</span>
        <label
          htmlFor={id}
          className='bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full'
        >
          <input
            type='checkbox'
            id={id}
            className='sr-only peer'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span className='w-2/5 h-4/5 bg-red-300 absolute rounded-full left-1 top-1 peer-checked:bg-green-500 peer-checked:left-11 transition-all duration-500'></span>
        </label>
      </div>

      <div className='w-full flex gap-4 items-center flex-wrap'>
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de apertura'
          isDisabled={!checked}
        />
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de cierre'
          isDisabled={!checked}
        />
        {schedules.length > 1 && checked && (
          <>
            <TimeInput
              className='w-40'
              isRequired
              label='Hora de apertura'
              isDisabled={!checked}
            />
            <TimeInput
              className='w-40'
              isRequired
              label='Hora de cierre'
              isDisabled={!checked}
            />
          </>
        )}
        <Button
          isIconOnly
          color={schedules.length > 1 && checked ? 'danger' : 'success'}
          aria-label='Sumar horario'
          onClick={() => {
            console.log('click');

            if (schedules.length > 1) {
              setSchedules([]);
            } else {
              setSchedules([...schedules, { opening: '', closure: '' }]);
            }
          }}
          isDisabled={!checked}
        >
          {schedules.length > 1 && checked ? (
            <i className='fa-solid fa-circle-minus'></i>
          ) : (
            <i className='fa-solid fa-circle-plus'></i>
          )}
        </Button>
      </div>
    </div>
  );
};
