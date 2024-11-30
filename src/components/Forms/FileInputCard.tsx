import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export const FileInputCard = ({
  imagePreview,
  setImagePreview,
  setImageFile,
}: {
  imagePreview: string;
  setImagePreview: (result: any) => void;
  setImageFile: (result: any) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeImagePreview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    setLoading(true);

    if (files) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          e.preventDefault();
          setImagePreview(e.target.result);
          setImageFile(files[0]);
          setLoading(false);
        }
      };
    }
  };

  return (
    <Card className='py-4'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <p className='text-tiny uppercase font-bold'>
          Incluye una imagen principal para tu negocio!
        </p>
        {/* <h4 className='font-bold text-large'>Frontend Radio</h4> */}
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <div className='flex flex-col items-center justify-center space-y-6'>
          <div className='w-full h-56 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center relative'>
            <input
              type='file'
              className='opacity-0 absolute w-full h-full cursor-pointer'
              accept='image/*'
              // multiple
              onChange={handleChangeImagePreview}
            />
            <CloudUploadIcon className='h-10 w-10 text-gray-500 dark:text-gray-400' />
            <p className='text-gray-500 dark:text-gray-400'>
              Haz click o arrastra la imagen aqui
            </p>
          </div>

          {loading ||
            (imagePreview && (
              <div className='w-full flex justify-center'>
                {loading ? (
                  <Spinner
                    label='Cargando imágen preview...'
                    color='default'
                    labelColor='foreground'
                  />
                ) : (
                  <Image
                    width={500}
                    className='w-full h-80 object-cover'
                    alt='Preview imagen del negocio'
                    src={imagePreview}
                  />
                )}
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

// export default function Component() {
//   return (
//     <Card className='max-w-xl mx-auto p-10 bg-white shadow-lg rounded-lg dark:bg-gray-800'>
//       <div className='flex flex-col items-center justify-center space-y-6'>
//         <div className='w-full h-56 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center'>
//           <CloudUploadIcon className='h-10 w-10 text-gray-500 dark:text-gray-400' />
//           <p className='text-gray-500 dark:text-gray-400'>
//             Drag & Drop your files here
//           </p>
//         </div>
//         <p className='text-gray-500 dark:text-gray-400'>or</p>
//         <Button variant='outline' className='w-32'>
//           Browse files
//         </Button>
//         <div className='w-full'>
//           <p className='text-gray-500 dark:text-gray-400 mb-2'>
//             Uploading filename.txt...
//           </p>
//           <div className='h-2 rounded overflow-hidden'>
//             <div className='h-full bg-blue-500' style={{ width: '70%' }} />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

function CloudUploadIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
      <path d='M12 12v9' />
      <path d='m16 16-4-4-4 4' />
    </svg>
  );
}
