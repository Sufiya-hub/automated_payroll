'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidContact } from 'react-icons/bi';
import { EMPLOYEEFORM } from '@/constants';
import InputComponent from './InputComponent';
import OtherInputs from './OtherInputs';
import { ToastContainer, toast } from 'react-toastify';
import { div } from '@tensorflow/tfjs';

const EmployeeForm = ({ setEmployeeForm }) => {
  const [FORM, setFORM] = useState(EMPLOYEEFORM);

  const [data, setData] = useState({
    fullName: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    birthDate: '',
    password: '',
    mobile: '',
    email: '',
    employeeImage: null,
    department: '',
    status: '',
    position: '',
  });

  // useEffect(() => {
  //   console.log('jhadjsa', data);
  // }, [data]);
  useEffect(() => {
    const getDepartmentData = async () => {
      const promise = await fetch('/api/departments/', {
        method: 'GET',
      });
      if (promise.ok) {
        const json = await promise.json();
        console.log(json);
        setFORM((prev) => {
          const updated = prev.map((el) => {
            if (el.bodyKey === 'department') {
              let updatedDepts = el;
              const options = json.map((el) => ({
                label: el.departmentName,
                value: el.departmentId,
              }));
              updatedDepts.options = options;
              return updatedDepts;
            } else {
              return el;
            }
          });
          return updated;
        });
      }
    };
    getDepartmentData();
  }, []);

  const handleInput = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // useEffect(() => console.log(data), [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('employeeImage', data.employeeImage);
    await fetch('/api/employees/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log('result:', res));
    notify();
  };

  const notify = () =>
    toast(() => <p className="font-semibold">Added successfully</p>);

  const testRef = useRef();
  const handleScroll = () => {
    if (testRef.current) testRef.current.stopPropagation();
  };
  return (
    <div
      className="absolute overflow-hideen  z-40 w-full inset-0"
      onScroll={handleScroll}
      ref={testRef}
    >
      <div className="absolute h-[120vh] bg-black/70 inset-0 z-50 flex flex-col gap-4 py-6 items-center  w-full">
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
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              onClick={() => setEmployeeForm(false)}
              className="bg-red-500 px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Add Employee
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeForm;
