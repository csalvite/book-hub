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
}

export const Input = ({
  label = '',
  type = 'text',
  className,
  name = '',
  value,
  placeholder = '',
  valid,
  invalid,
  required,
}: inputProps) => {
  return (
    <div id='input' className='flex flex-col'>
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
  );
};
