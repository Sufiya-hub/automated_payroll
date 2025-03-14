'use client';
import React, { useState, useEffect } from 'react';
import { BANK } from '@/constants';
import { BsPersonFillAdd } from 'react-icons/bs';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeBankData = ({ setModel, empId }) => {
  const [FORM, setFORM] = useState(BANK);

  const [data, setData] = useState({
    account_number: '',
    ifsc: '',
    salary: '',
    employeeId: empId,
  });

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/fundAccounts/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('result:', res);
        if (res?.message === 'success') setModel(false);
      });
    notify();
  };

  const notify = () =>
    toast(() => <p className="font-semibold">Added successfully</p>);

  return (
    <div className="bg-black/60 h-screen flex items-center justify-center absolute w-full inset-0">
      <div className="flex flex-col gap-4 py-6 items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col shadow-xl border-2 gap-4 w-[65%] p-4 rounded-xl bg-background"
        >
          <div className="flex items-center justify-between p-4 bg-brand rounded-t-xl headers -mt-4 -ml-4 ">
            <h1 className="flex gap-2 items-center justify-center font-semibold text-lg  text-white">
              <BsPersonFillAdd /> Employee Bank information
            </h1>
          </div>
          <div className="grid items-center p-4 md:grid-cols-2 pb-4 gap-6">
            {FORM.map((item, index) =>
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
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              onClick={() => setModel(false)}
              className="bg-red-500 px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Create Fund Account
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeBankData;
