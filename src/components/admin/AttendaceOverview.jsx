import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { GoDotFill } from 'react-icons/go';
import { MdArrowOutward } from 'react-icons/md';

const AttendaceOverview = () => {
  return (
    <div className="border-2 rounded-xl p-3 shadow-md gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Attendance Overview</h1>
        <BiDotsVerticalRounded />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">90%</h1>
        <div className="flex gap-3">
          <h1 className="flex gap-1 border-2 border-green-50  px-1 bg-green-50 items-center">
            <MdArrowOutward />
            20%
          </h1>
          <h1 className="">since last month</h1>
        </div>
      </div>
      <div className="flex gap-1 h-2">
        <div className="bg-green-500 h-2 w-20 rounded-xl"></div>
        <div className="bg-yellow-500 h-2 w-28 rounded-xl"></div>
        <div className="bg-violet-500 h-2  rounded-xl w-full"></div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <GoDotFill className="text-yellow-500" />
          <h1>Sick Leave</h1>
        </div>
        <div className="flex gap-1 items-center">
          <GoDotFill className="text-green-500" />
          <h1>Day Off</h1>
        </div>
        <div className="flex gap-1 items-center">
          <GoDotFill className="text-violet-500" />
          <h1>On time</h1>
        </div>
      </div>
    </div>
  );
};

export default AttendaceOverview;
