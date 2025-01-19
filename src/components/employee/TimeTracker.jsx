import React from 'react';
import { MdArrowOutward } from 'react-icons/md';

const TimeTracker = () => {
  return (
    <div className="flex flex-col gap-3 px-7 py-4 border-2 rounded-2xl bg-background w-[25%]">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl">Time tracker</h1>
        <div className="border-2 border-white rounded-full p-2 bg-white">
          <MdArrowOutward size={20} />
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
