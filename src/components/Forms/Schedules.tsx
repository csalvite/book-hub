import { TimeInput } from '@nextui-org/date-input';
import { useEffect, useState } from 'react';
import { Button, Divider } from '@nextui-org/react';
import { ToggleSwitch } from './ToggleSwitch';
import type { TimeValue } from '@react-types/datepicker';
import { addLeadingZero } from '@/utils/dates';

interface IToggleSwitch {
  id: string;
  value: {
    day: string;
    schedule: string;
  };
  onChange: (id: string, value: string) => void;
}

interface ISchedules {
  opening: string;
  closure: string;
}

export const Schedules = ({ id, value, onChange }: IToggleSwitch) => {
  const [checked, setChecked] = useState(false);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);
  const [morning, setMorning] = useState<ISchedules>({
    opening: '',
    closure: '',
  });
  const [afternoon, setAfternoon] = useState<ISchedules>({
    opening: '',
    closure: '',
  });

  const formatTime = (value: TimeValue) =>
    `${addLeadingZero(value.hour)}:${addLeadingZero(value.minute)}`;

  useEffect(() => {
    if (morning.opening && morning.closure) {
      let formattedSchedule = `${morning.opening}-${morning.closure}`;
      if (schedules.length > 1 && afternoon.opening && afternoon.closure) {
        formattedSchedule += `,${afternoon.opening}-${afternoon.closure}`;
      }
      onChange(id, formattedSchedule);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morning, afternoon]);

  const handleScheduleToggle = () => {
    if (schedules.length > 1) {
      setSchedules([]);
    } else {
      setSchedules([...schedules, { opening: '', closure: '' }]);
    }
  };

  return (
    <div className='w-4/5 py-2 flex gap-4 items-center justify-start'>
      <ToggleSwitch id={value.day} checked={checked} setChecked={setChecked} />

      <div id={value.day} className='w-full flex gap-4 items-center flex-wrap'>
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de apertura'
          onChange={(value) =>
            setMorning((prev) => ({ ...prev, opening: formatTime(value) }))
          }
          isDisabled={!checked}
        />
        <TimeInput
          className='w-40'
          isRequired
          label='Hora de cierre'
          onChange={(value) =>
            setMorning((prev) => ({ ...prev, closure: formatTime(value) }))
          }
          isDisabled={!checked}
        />
        {schedules.length > 1 && checked && (
          <>
            <TimeInput
              className='w-40'
              isRequired
              label='Hora de apertura'
              onChange={(value) =>
                setAfternoon((prev) => ({
                  ...prev,
                  opening: formatTime(value),
                }))
              }
              isDisabled={!checked}
            />
            <TimeInput
              className='w-40'
              isRequired
              label='Hora de cierre'
              onChange={(value) =>
                setAfternoon((prev) => ({
                  ...prev,
                  closure: formatTime(value),
                }))
              }
              isDisabled={!checked}
            />
          </>
        )}
        <Button
          isIconOnly
          color={schedules.length > 1 ? 'danger' : 'success'}
          aria-label='Toggle schedule'
          onClick={handleScheduleToggle}
          isDisabled={!checked}
        >
          <i
            className={`fa-solid ${
              schedules.length > 1 ? 'fa-circle-minus' : 'fa-circle-plus'
            }`}
          />
        </Button>
        <Divider className='my-2' />
      </div>
    </div>
  );
};
