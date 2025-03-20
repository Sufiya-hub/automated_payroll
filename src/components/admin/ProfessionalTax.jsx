'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ProfessionalTax = () => {
  const initial = {
    minValue: '',
    maxValue: '',
    value: '',
  };
  const [data, setData] = useState([initial]);

  useEffect(() => {
    const getData = async () => {
      await axios.get('/api/salaryComponents/professionalTax').then((res) => {
        if (res?.data?.message === 'success') {
          console.log(res.data.data);
          setData(res.data.data);
        }
      });
    };
    getData();
  }, []);

  //   [
  //     {
  //         'minimum': 1000,
  //         'maximum': 2000,
  //         'value': 100
  //     }
  //   ]

  const handleInput = (key, index, value) => {
    setData((prev) => {
      const out = prev.map((item, ind) => {
        if (index === ind) {
          return { ...item, [key]: +value };
        } else return item;
      });
      return out;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/salaryComponents/professionalTax', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log('result:', res));
    notify();
  };

  useEffect(() => console.log(data), [data]);

  const notify = () =>
    toast(() => <p className="font-semibold">Updated Successfully</p>);

  return (
    <div className="flex flex-col gap-4 border-b-[1px]">
      <h1 className="text-gray-500 font-medium">Professional Tax</h1>
      {data && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-4 pb-4 gap-2"
        >
          {data &&
            data?.map((item, index) => (
              <div key={index} className="grid grid-cols-3 w-full gap-4">
                <input
                  type={'text'}
                  placeholder={'Minimum Value'}
                  onChange={(e) => {
                    handleInput('minValue', index, e.target.value);
                  }}
                  value={data?.[index].minValue}
                  required={true}
                  className="border-[1px] outline-none bg-transparent p-2 focus:border-brand transition-all rounded-lg"
                />
                <input
                  type={'text'}
                  placeholder={'Maximum Value'}
                  onChange={(e) => {
                    handleInput('maxValue', index, e.target.value);
                  }}
                  value={data?.[index].maxValue || ''}
                  //   required={true}
                  className="border-[1px] outline-none bg-transparent p-2 focus:border-brand transition-all rounded-lg"
                />
                <input
                  type={'text'}
                  placeholder={'Deduction Value'}
                  onChange={(e) => {
                    handleInput('value', index, e.target.value);
                  }}
                  value={data?.[index].value}
                  required={true}
                  className="border-[1px] outline-none bg-transparent p-2 focus:border-brand transition-all rounded-lg"
                />
              </div>
            ))}
          <div className="col-span-2 col-start-1 flex justify-end gap-4 w-full">
            <button
              type="button"
              onClick={() => setData((prev) => [...prev, initial])}
              className="bg-brand px-4 self-end py-2 rounded-lg hover:shadow-sm transition-all text-white"
            >
              Add More
            </button>
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

export default ProfessionalTax;
