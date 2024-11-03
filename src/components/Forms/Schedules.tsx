import { TimeInput } from '@nextui-org/date-input';
import { useState } from 'react';
import { Button, Divider } from '@nextui-org/react';
import { ToggleSwitch } from './ToggleSwitch';
import type { TimeValue } from '@react-types/datepicker';

interface IToggleSwitch {
  id: string;
  value: {
    day: string;
    schedule: string;
  };
  onChange: (id: any, value: any) => void;
}

interface ISchedules {
  opening: string;
  closure: string;
}

export const Schedules = ({ id, value, onChange }: IToggleSwitch) => {
  const [checked, setChecked] = useState(false);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);

  const handleChangeSchedule = (value: TimeValue) => {
    onChange(id, value);
  };

  return (
    <div className='w-4/5 py-2 flex gap-4 items-center justify-start'>
      <ToggleSwitch id={value.day} checked={checked} setChecked={setChecked} />

      <div id={value.day} className='w-full flex gap-4 items-center flex-wrap'>
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de apertura'
          onChange={handleChangeSchedule}
          isDisabled={!checked}
        />
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de cierre'
          onChange={handleChangeSchedule}
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
        <Divider className='my-2' />
      </div>
    </div>
  );
};
