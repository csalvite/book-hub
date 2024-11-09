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
import { IServicesRecommended } from '@/interfaces/enterprise-form';

interface ServiceModalProps {
  service: IServicesRecommended;
  open: any;
  setOpen: (open: boolean) => void;
}

export const ServiceModal = ({ service, open, setOpen }: ServiceModalProps) => {
  const hours = [
    { key: 1, label: '1h' },
    { key: 2, label: '2h' },
    { key: 3, label: '3h' },
    { key: 4, label: '4h' },
    { key: 5, label: '5h' },
    { key: 6, label: '6h' },
  ];

  const minutes = [
    { key: 10, label: '10min' },
    { key: 15, label: '15min' },
    { key: 20, label: '20min' },
    { key: 30, label: '30min' },
    { key: 40, label: '40min' },
    { key: 50, label: '50min' },
  ];

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
              />
              <div className='flex justify-between gap-4'>
                <Select label='Horas' className='max-w-xs'>
                  {hours.map((hour) => (
                    <SelectItem key={hour.key}>{hour.label}</SelectItem>
                  ))}
                </Select>
                <Select label='Minutos' className='max-w-xs'>
                  {minutes.map((minute) => (
                    <SelectItem key={minute.key}>{minute.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Input
                type='number'
                label='Precio'
                placeholder='0.00'
                labelPlacement='outside'
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
              <Button color='primary' onPress={onClose}>
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
