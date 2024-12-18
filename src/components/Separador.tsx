export const Separador = ({
  text,
  className = '',
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      {text ? (
        <>
          <hr className='w-full' />
          <span className='text-xs text-slate-400'>{text}</span>
          <hr className='w-full' />
        </>
      ) : (
        <hr className='w-full' />
      )}
    </div>
  );
};
