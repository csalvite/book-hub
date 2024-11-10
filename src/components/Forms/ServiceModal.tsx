import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Select,
  SelectItem,
  Input,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { IOptionServices } from '@/interfaces/enterprise-form';
import { useState } from 'react';
import { validateServices } from '@/utils/validation';

interface ServiceModalProps {
  service: IOptionServices;
  open: any;
  setOpen: (open: boolean) => void;
  onClick: (service: IOptionServices) => void;
}

interface TimeOption {
  key: number;
  label: string;
}

interface Validation {
  prop: string;
  isValid: boolean;
}

export const ServiceModal = ({
  service,
  open,
  setOpen,
  onClick,
}: ServiceModalProps) => {
  const [option, setOption] = useState(service);
  const [invalid, setInvalid] = useState({
    hours: false,
    minutes: false,
    price: false,
  });

  const hours: TimeOption[] = [
    { key: 0, label: '0h' },
    { key: 1, label: '1h' },
    { key: 2, label: '2h' },
    { key: 3, label: '3h' },
    { key: 4, label: '4h' },
    { key: 5, label: '5h' },
    { key: 6, label: '6h' },
  ];

  const minutes: TimeOption[] = [
    { key: 0, label: '0min' },
    { key: 10, label: '10min' },
    { key: 15, label: '15min' },
    { key: 20, label: '20min' },
    { key: 30, label: '30min' },
    { key: 40, label: '40min' },
    { key: 50, label: '50min' },
  ];

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    setOption((prevData) => {
      return {
        ...prevData,
        description: event.target.value,
      };
    });

  const handleSelectHours = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption((prevData) => {
      let [hours, minutes] = prevData.duration.split(':');

      hours = event.target.value;

      return {
        ...prevData,
        duration: `${hours}:${minutes}`,
      };
    });
  };

  const handleSelectMinutes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption((prevData) => {
      let [hours, minutes] = prevData.duration.split(':');

      minutes = event.target.value;

      return {
        ...prevData,
        duration: `${hours}:${minutes}`,
      };
    });
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prevData) => {
      return {
        ...prevData,
        price: Number(event.target.value),
      };
    });
  };

  const submitServiceData = (onClose: any) => {
    setInvalid({
      hours: false,
      minutes: false,
      price: false,
    });

    const [hours, minutes] = option.duration.split(':');
    const validation: Validation = validateServices(
      option.price,
      hours,
      minutes
    );

    if (validation.prop === 'time' && !validation.isValid) {
      setInvalid({ ...invalid, hours: true, minutes: true });
      return;
    }

    if (validation.prop === 'price' && !validation.isValid) {
      setInvalid({ ...invalid, price: true });
      return;
    }

    onClick(option);
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      placement={'center'}
      onOpenChange={() => setOpen(!open)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-black'>
              {service.name}
            </ModalHeader>
            <ModalBody>
              <Textarea
                label='Descripción'
                variant='bordered'
                className='text-gray-500 w-full'
                placeholder='Descripción del servicio'
                disableAnimation
                disableAutosize
                classNames={{
                  input: 'resize-y min-h-[40px]',
                }}
                onChange={(e) =>
                  handleChangeDescription(
                    e as unknown as React.ChangeEvent<HTMLTextAreaElement>
                  )
                }
              />
              <div className='flex justify-between gap-4'>
                <Select
                  label='Horas'
                  isInvalid={invalid.hours}
                  className='max-w-xs'
                  onChange={handleSelectHours}
                >
                  {hours.map((hour) => (
                    <SelectItem key={hour.key}>{hour.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  label='Minutos'
                  isInvalid={invalid.minutes}
                  className='max-w-xs'
                  onChange={handleSelectMinutes}
                >
                  {minutes.map((minute) => (
                    <SelectItem key={minute.key}>{minute.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Input
                type='number'
                label='Precio'
                isInvalid={invalid.price}
                placeholder='0.00'
                labelPlacement='outside'
                onChange={handleChangePrice}
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>€</span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color='primary'
                onPress={() => submitServiceData(onClose)}
              >
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
