import { PrefixSelector } from './PrefixSelector';

interface inputProps {
  label?: string;
  type?: string;
  className?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  valid?: boolean;
  invalid?: boolean;
  required?: boolean;
  setPrefix?: any;
}

export const Input = ({
  label = '',
  type = 'text',
  className,
  name = '',
  value,
  placeholder = '',
  valid,
  setPrefix,
  invalid,
  required,
}: inputProps) => {
  return (
    <div className={`${className ? className : 'w-full'} flex items-end gap-6`}>
      {type === 'telf' && <PrefixSelector setPrefix={setPrefix} />}
      <div id='input' className='w-full flex flex-col'>
        <label htmlFor={name} className='text-gray-600 text-xs'>
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={`mt-[0.3rem] border border-slate-300 text-sm rounded p-2 w-full
            ${className} ${valid} ${invalid}`}
          value={value}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};
