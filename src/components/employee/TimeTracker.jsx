import React from 'react';
import { MdArrowOutward } from 'react-icons/md';

const TimeTracker = () => {
  const attendance = Array.from({ length: 28 }, (_, i) => ({
    status: i % 3 === 0,
  }));

  // console.log(attendance);
  return (
    <div className="flex flex-col gap-3 px-7 py-4 border-2 rounded-2xl bg-background w-[25%]">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl">Time tracker</h1>
        <div className="border-2 border-white rounded-full p-2 bg-white">
          <MdArrowOutward size={20} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {attendance.map((el, i) => (
          <div
            className={`h-6 w-6 ${
              el.status ? 'bg-green-600' : 'bg-green-200  border-green-800'
            } rounded-lg`}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracker;
