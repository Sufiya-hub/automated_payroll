import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const EmployeesOverview = () => {
  return (
    <div className="border-2 rounded-xl p-3 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">TotalEmployees</h1>
        <BiDotsVerticalRounded size={24} />
      </div>
      <div className="flex justify-between items-center border-2  px-3 py-1 bg-[#b6dee4] mt-3 rounded-[5px]">
        <h1 className="font-semibold text-2xl">6</h1>
        <h1 className="font-medium">Fulltime Employee</h1>
      </div>
      <div className="flex justify-between items-center border-2 px-3 py-1 mt-3  rounded-[5px]">
        <h1 className="font-semibold text-2xl">4</h1>
        <h1 className="font-medium">Others</h1>
      </div>
    </div>
  );
};

export default EmployeesOverview;
