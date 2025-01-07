'use client';
import React from 'react';

const InputComponent = ({
  type,
  handleInput,
  value,
  placeholder,
  bodyKey,
  label,
  required,
}) => {
  return (
    <div className="flex flex-col gap-3" key={bodyKey}>
      <label className="font-medium text-md ml-1">{label}</label>
      {type !== 'textarea' ? (
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            handleInput(bodyKey, e.target.value);
          }}
          value={value}
          required={required || false}
          className="border-b-2 outline-none bg-transparent py-1 px-1 focus:border-brand transition-all"
        />
      ) : (
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          required={required || false}
          className="border-b-2 outline-none bg-transparent resize-none"
        />
      )}
    </div>
  );
};

export default InputComponent;
