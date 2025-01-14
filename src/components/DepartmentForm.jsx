'use client';
import React, { useState, useEffect } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { DEPTFORM } from '@/constants';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';

const DepartmentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [FORM, setFORM] = useState(DEPTFORM);
  const [data, setData] = useState({
    departmentName: '',
    departmentCode: '',
    workingHours: 0,
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await fetch('/api/departments/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res?.message === 'ok' && notify());
    setIsLoading(false);
  };

  const notify = () =>
    toast(() => <p className="font-semibold">Added successfully</p>);

  return (
    <div className="flex flex-col gap-4 py-6 items-center h-[100vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-xl border-2 gap-4 w-[65%] p-4 rounded-xl bg-background"
      >
        <div className="flex items-center justify-between p-4 bg-brand rounded-t-xl headers -mt-4 -ml-4 ">
          <h1 className="flex gap-2 items-center justify-center font-semibold text-lg  text-white">
            <BsPersonFillAdd /> Department information
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
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
          >
            Add Department
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default DepartmentForm;
