'use client';
import React from 'react';
import Progress from './Progress';
import TimeTracker from './TimeTracker';

const EmpPhoto = () => {
  return (
    <div className="flex h-[45%] gap-2">
      <div className="relative flex bg-[url('/girl.jpg')] justify-between items-center bg-cover rounded-2xl w-[25%]  bg-no-repeat">
        <div className="text-white pb-2 absolute bottom-0 flex justify-between items-center px-4 left-0 right-0 h-1/4 rounded-2xl bg-black opacity-50">
          <div className="flex flex-col">
            <h1 className="font-medium text-xl">Lora Piterson</h1>
            <h1 className="font-normal">UX/UI Designer</h1>
          </div>
          <div className="border-2 px-3 rounded-xl border-gray-400">
            <h1>$1,200</h1>
          </div>
        </div>
      </div>
      <Progress />
      <TimeTracker />
    </div>
  );
};

export default EmpPhoto;
