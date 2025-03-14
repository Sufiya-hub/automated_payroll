'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EmployeeTable from './admin/EmployeeTable';
import Head from './admin/Head';

const Section1 = () => {
  const handleAtRequest = async () => {
    try {
      await fetch('/api/attendance/', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const session = useSession();
  return (
    <div className="flex flex-col gap-2">
      <div className="border-b-2 p-4 flex justify-between items-center">
        <h1 className="font-medium text-lg">Dashboard</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAtRequest}
            className=" bg-brand font-bold text-white px-3 py-2 rounded-lg  shadow-md hover:bg-brand/80 transition-all"
          >
            Generate AT request
          </button>
        </div>
      </div>
      <Head empName={session?.data?.user?.name} />

      <div className="px-4 pb-2">
        <div className="bg-white p-2 border-[1px] border-gray-300 shadow-sm rounded-[15px]">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Section1;
