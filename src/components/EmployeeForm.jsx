'use client';
import React, { useState } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { EMPLOYEEFORM } from '@/constants';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';

const EmployeeForm = () => {
  const [data, setData] = useState({
    fullName: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    birthDate: '',
    mobile: '',
    email: '',
  });

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // useEffect(() => console.log(data), [data]);

  const handleSubmit = async () => {
    await fetch('/api/employees/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="flex flex-col  gap-4 py-6 items-center h-[100vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-xl border-2 gap-4 w-[65%] p-4 rounded-xl bg-background"
      >
        <div className="flex items-center justify-between">
          <h1 className="flex gap-2 items-center justify-center font-semibold text-lg text-brand">
            <BsPersonFillAdd /> Employee information
          </h1>
        </div>
        <div className="grid items-center md:grid-cols-2  pb-4 gap-6">
          {EMPLOYEEFORM.map((item, index) =>
            !['file', 'select'].includes(item.type) ? (
              <InputComponent
                key={index}
                handleInput={handleInput}
                value={data[item.bodyKey]}
                {...item}
              />
            ) : (
              <OtherInputs
                key={index}
                value={data[item.bodyKey]}
                handleInput={handleInput}
                {...item}
              />
            )
          )}
        </div>
        <button
          type="submit"
          className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
