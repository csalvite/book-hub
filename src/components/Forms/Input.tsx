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
  prefix?: string;
  setPrefix?: any;
  onChange?: any;
}

export const Input = ({
  label = '',
  type = 'text',
  className,
  name = '',
  value,
  placeholder = '',
  valid,
  prefix,
  setPrefix,
  invalid,
  required,
  onChange,
}: inputProps) => {
  return (
    <div className={`${className ? className : 'w-full'} flex items-end gap-6`}>
      {type === 'telf' && (
        <PrefixSelector prefix={prefix || '+34'} setPrefix={setPrefix} />
      )}
      <div id='input' className='w-full flex flex-col'>
        <label htmlFor={name} className='text-gray-600 text-xs'>
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={`mt-[0.3rem] border border-slate-300 text-sm rounded p-2 w-full
            ${className} ${valid} ${invalid && 'border-red-400'}`}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
        {invalid && (
          <span className='text-red-400 text-xs'>
            Debes indicar un valor válido
          </span>
        )}
      </div>
    </div>
  );
};
