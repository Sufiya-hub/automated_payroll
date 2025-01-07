'use client';
import React from 'react';

const OtherInputs = ({
  type,
  bodyKey,
  label,
  value,
  options,
  required,
  handleInput,
}) => {
  return (
    <div className="flex flex-col gap-3" key={bodyKey}>
      <label className="font-medium text-md ml-1">{label}</label>
      {type === 'select' ? (
        <select
          required={required || false}
          onChange={(e) => {
            handleInput(bodyKey, e.target.value);
          }}
          value={value}
          className="border-b-2 outline-none bg-transparent py-1 px-1 focus:border-brand transition-all"
        >
          <option>Select Your Option</option>
          {options.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <input type="file" name="" id="" />
        </div>
      )}
    </div>
  );
};

export default OtherInputs;
