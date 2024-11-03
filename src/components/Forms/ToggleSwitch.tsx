import { useState } from 'react';

interface IToggleSwitch {
  id: string;
  checked: boolean;
  setChecked: any;
}

export const ToggleSwitch = ({ id, checked, setChecked }: IToggleSwitch) => {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-sm'>{id}</span>
      <label
        htmlFor={id}
        className='bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full'
      >
        <input
          type='checkbox'
          id={id}
          className='sr-only peer'
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className='w-2/5 h-4/5 bg-red-300 absolute rounded-full left-1 top-1 peer-checked:bg-green-500 peer-checked:left-11 transition-all duration-500'></span>
      </label>
    </div>
  );
};
