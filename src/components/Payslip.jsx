'use client';
import React from 'react';
import { SALARY, DEDU } from '@/constants';

const Payslip = () => {
  return (
    <div className="flex flex-col  p-8 items-center justify-center ">
      <div className="flex flex-col  rounded-xl bg-background p-8 items-center justify-center mt-4">
        <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:gap-40 bg-white rounded-lg px-8 py-4">
          <div className="h-[180px] w-[180px] border-[20px] border-violet-400 rounded-full flex flex-col gap-1 items-center justify-center">
            <h1 className="font-bold text-2xl">67,500</h1>
            <h1 className="text-gray-400 font-semibold text-lg">Gross Pay</h1>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">February 2022</h1>
            <div className="flex gap-10">
              <div className="flex gap-3">
                <div className="h-[20px] w-[20px] rounded-full mt-1 bg-violet-400"></div>
                <div className="flex flex-col">
                  <h1 className="font-medium text-lg">67,500.00</h1>
                  <h1 className="text-gray-500 font-medium">Earnings</h1>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-[20px] w-[20px] rounded-full mt-1 bg-orange-400"></div>
                <div className="flex flex-col">
                  <h1 className="font-medium text-lg">5,500.00</h1>
                  <h1 className="text-gray-500 font-medium">Deductions</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 py-4 md:self-end items-center justify-center">
          <button className="bg-orange-400 hover:shadow-lg text-white py-2 px-4 text-lg rounded-xl">
            Download
          </button>
          <button className="text-gray-500 hover:shadow-lg border-2 border-gray-300 py-2 px-4 text-lg rounded-xl">
            Raise Issue
          </button>
        </div>
        <div className="flex flex-col bg-white rounded-lg w-full px-6 py-4">
          <h1 className="font-bold text-xl mb-4">Earnings</h1>
          {SALARY.map((item, index) => (
            <div className="flex flex-col px-4 md:px-10 py-2 " key={index}>
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-gray-600 text-lg">
                  {item.name}
                </h1>
                <h1 className="font-medium text-lg">{item.amount}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4 bg-white rounded-lg w-full px-6 py-4">
          <h1 className="font-bold text-xl mb-4 text-orange-400">Deductions</h1>
          {DEDU.map((item, index) => (
            <div className="flex flex-col px-4 md:px-10 py-2 " key={index}>
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-gray-600 text-lg">
                  {item.name}
                </h1>
                <h1 className="font-medium text-lg">{item.amount}</h1>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 md:px-9 border-t-2 mt-4 py-4">
            <h1 className="font-bold text-xl mb-4 text-orange-400 w-[10ch] md:w-full">
              Gross Deductions
            </h1>
            <h1 className="font-medium text-lg text-orange-400 ">₹5,500.00</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
