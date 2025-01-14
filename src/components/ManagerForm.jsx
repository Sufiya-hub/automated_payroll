'use client';
import React, { useState } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { EMPLOYEEFORM } from '@/constants';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';
import { ToastContainer, toast } from 'react-toastify';

const ManagerForm = () => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/employees/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    notify();
  };

  const notify = () =>
    toast(() => <p className="font-semibold">Added successfully</p>);
  return (
    <div className="flex flex-col  gap-4 py-6 items-center h-[100vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-xl border-2 gap-4 w-[65%] p-4 rounded-xl bg-background"
      >
        <div className="flex items-center justify-between p-4 bg-brand rounded-t-xl headers -mt-4 -ml-4 ">
          <h1 className="flex gap-2 items-center justify-center font-semibold text-lg text-white">
            <BsPersonFillAdd /> Manager information
          </h1>
        </div>
        <div className="grid items-center md:grid-cols-2  pb-4 gap-6">
          {EMPLOYEEFORM.map((item, index) =>
            !['file', 'select'].includes(item.type) ? (
              <InputComponent
                key={index}
                {...item}
                handleInput={handleInput}
                value={data[item.bodyKey]}
              />
            ) : (
              <OtherInputs
                key={index}
                {...item}
                value={data[item.bodyKey]}
                handleInput={handleInput}
              />
            )
          )}
        </div>
        <button
          type="submit"
          className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
        >
          Add Manager
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ManagerForm;
