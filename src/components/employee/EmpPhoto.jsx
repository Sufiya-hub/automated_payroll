'use client';
import React from 'react';
import Progress from './Progress';
import TimeTracker from './TimeTracker';

const formatINR = (amount) => {
  if (!amount) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

const EmpPhoto = ({ imageName, session }) => {
  return (
    <div className="flex h-[50%] gap-2">
      {/* <div 
        // className={`relative flex bg-[url('/employees/${imageName}')] justify-between items-center bg-cover rounded-2xl w-[25%]  bg-no-repeat`}
      // >
      */}
      <div
        className={`relative flex justify-between items-center bg-cover rounded-2xl w-[20%]  bg-no-repeat`}
      >
        {imageName && (
          <img
            src={`/employees/${imageName}`}
            alt="empImage"
            className="absolute h-full w-full rounded-lg"
          />
        )}
        <div className="text-white pb-2 absolute bottom-0 flex justify-between items-center px-4 left-0 right-0 h-1/4 rounded-2xl bg-black opacity-50">
          <div className="flex flex-col">
            <h1 className="font-medium text-xl">{session?.data?.user?.name}</h1>
            <h1 className="font-normal capitalize">
              {session?.data?.user?.position}
            </h1>
          </div>
          <div className="border-2 px-3 rounded-xl border-gray-400">
            <h1>{formatINR(session?.data?.user?.salary)}</h1>
          </div>
        </div>
      </div>
      <Progress />
      <TimeTracker />
    </div>
  );
};

export default EmpPhoto;
