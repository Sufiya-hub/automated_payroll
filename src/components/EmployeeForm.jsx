'use client';
import React, { useState, useEffect } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { EMPLOYEEFORM } from '@/constants';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeForm = () => {
  const [FORM, setFORM] = useState(EMPLOYEEFORM);

  const [data, setData] = useState({
    fullName: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    birthDate: '',
    mobile: '',
    email: '',
    managerId: '',
  });

  useEffect(() => {
    const getManagersData = async () => {
      await fetch('api/managers', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const managersData = res.map((el) => ({
            label: el.fullName,
            value: el.id,
          }));
          console.log(managersData);
          setFORM((prev) => {
            const updated = prev.map((el) => {
              if (el.bodyKey === 'managerId') {
                el.options = managersData;
              }
              return el;
            });
            // console.log('prev:', prev);
            // prev.map((el) => {
            //   console.log(el.bodyKey);
            // });
            return updated;
          });
        });
    };
    getManagersData();
  }, []);

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => console.log(data), [data]);

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
    <div className="flex flex-col gap-4 py-6 items-center h-[100vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-xl border-2 gap-4 w-[65%] p-4 rounded-xl bg-background"
      >
        <div className="flex items-center justify-between p-4 bg-brand rounded-t-xl headers -mt-4 -ml-4 ">
          <h1 className="flex gap-2 items-center justify-center font-semibold text-lg  text-white">
            <BsPersonFillAdd /> Employee information
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
        <button
          type="submit"
          className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
        >
          Add Employee
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeForm;
