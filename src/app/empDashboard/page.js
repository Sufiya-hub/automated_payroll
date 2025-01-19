import React from 'react';
import Header1 from '@/components/employee/Header1';
import EmpPhoto from '@/components/employee/EmpPhoto';

const page = () => {
  return (
    <div className="flex flex-col p-4 bg-background w-full h-[100vh]">
      <div className="flex flex-col p-4 bg-[#ceeff5] h-full rounded-xl gap-4">
        <Header1 />
        <EmpPhoto />
      </div>
    </div>
  );
};

export default page;
