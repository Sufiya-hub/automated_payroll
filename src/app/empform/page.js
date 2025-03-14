'use client';
import React from 'react';
import EmployeeForm from '@/components/EmployeeForm';

const page = () => {
  return (
    <div className="flex flex-col  gap-4 py-6 w-full items-center h-[100vh]">
      <EmployeeForm />
    </div>
  );
};

export default page;
