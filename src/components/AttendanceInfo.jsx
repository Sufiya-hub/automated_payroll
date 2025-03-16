import React from 'react';
import { ATTENDANCE_DATA } from '@/constants/payments';

const AttendanceInfo = () => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full ">
      {ATTENDANCE_DATA.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 shadow-lg rounded-lg py-6 px-4 "
        >
          <div className="flex gap-2 items-center">
            <h1 className="text-blue-700">{item.icon}</h1>
            <h1 className="text-sm font-medium">{item.label}</h1>
          </div>
          <h1 className="mt-3 font-semibold text-xl">{item.count}</h1>
          <div className="flex gap-1 items-center text-xs w-[50ch]">
            <div
              className={`flex gap-1 items-center justify-center px-2 ${
                item.key === 'leaves'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 px-2 text-green-800'
              }  rounded-sm`}
            >
              <h1>{item.arrow}</h1>
              <h1>{item.per}</h1>
            </div>
            <h1>{item.tag}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceInfo;
