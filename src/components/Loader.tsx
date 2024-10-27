import Image from 'next/image';

const Loader = ({ className }: { className?: string }) => {
  return (
    <Image
      src={'/loaders/tail-spin.svg'}
      alt='loading'
      className={`${className ? className : 'w-24 h-24'}`}
      width={100}
      height={50}
    />
  );
};

export default Loader;
