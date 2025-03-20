'use client';
import React, { useState, useEffect } from 'react';
import { SALARY_COMPONENTS } from '@/constants/payments';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const InputComponent = ({
  type,
  handleInput,
  value,
  placeholder,
  bodyKey,
  label,
  required,
  hint,
}) => {
  return (
    <div className="grid grid-cols-2  gap-3" key={bodyKey}>
      <div className="">
        <label className="font-medium text-md ml-1">{label}</label>
        <p className="font-medium text-[10px] ml-1">
          {hint !== '' && `(${hint})`}
        </p>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          handleInput(bodyKey, e.target.value);
        }}
        value={value}
        required={required || false}
        className="border-[1px] outline-none bg-transparent p-2 focus:border-brand transition-all rounded-lg"
      />
    </div>
  );
};

const SalaryComponent = () => {
  const [form, setForm] = useState(SALARY_COMPONENTS);
  const [data, setData] = useState({
    basic: '',
    da: '',
    hra: '',
    otherAllowances: '',
    pf: '',
  });

  useEffect(() => {
    const getData = async () => {
      await axios.get('/api/salaryComponents').then((res) => {
        if (res?.data?.message === 'success') {
          console.log(res.data.data[0]);
          setData(res.data.data?.[0]);
        }
      });
    };
    getData();
  }, []);

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/salaryComponents', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log('result:', res));
    notify();
  };

  const notify = () =>
    toast(() => <p className="font-semibold">Updated Successfully</p>);

  return (
    <div className="flex flex-col gap-4 border-b-[1px]">
      <h2 className="text-gray-500 font-medium">Salary Components</h2>
      {data && (
        <form
          onSubmit={handleSubmit}
          className="grid items-center p-4 md:grid-cols-2 pb-4 gap-6"
        >
          {form.map((item, index) => (
            <InputComponent
              key={index}
              handleInput={handleInput}
              value={data[item?.bodyKey]}
              {...item}
            />
          ))}
          <div className="col-span-2 col-start-1 flex justify-end">
            <button
              type="submit"
              className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Update
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default SalaryComponent;
