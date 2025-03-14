'use client';
import React from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

const Progress = () => {
  return (
    <div className="flex flex-col gap-3 px-7 py-4 shadow-lg rounded-2xl bg-background w-[25%]">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl">Progress</h1>
        <div className="border-2 border-white rounded-full p-2 bg-white">
          <MdArrowOutward size={20} />
        </div>
      </div>
      <div className="flex gap-4">
        <h1 className="font-normal text-4xl">6.1h</h1>
        <h1 className="w-[10ch] text-sm">Work Time this week</h1>
      </div>
      <div className="grid grid-cols-7 mt-4 gap-3 h-full">
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>S</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>M</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>T</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>W</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>T</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>F</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[100%] bg-gray-300 w-[8px] rounded-3xl"></div>
          <div className="text-gray-300">
            <GoDotFill />
          </div>
          <h1>Sa</h1>
        </div>
      </div>
    </div>
  );
};

export default Progress;
