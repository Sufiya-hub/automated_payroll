import React from 'react';
import { DropdownMenuDemo } from '../DropMenu';

const Head = () => {
  return (
    <div className="px-4 py-2 flex justify-between items-center mr-8">
      <h1 className="font-medium text-lg">Good Morning, Admin</h1>
      <div className="flex gap-8">
        <input
          type="date"
          className="border-2 px-2 py-1 rounded-xl shadow-md"
        />

        <DropdownMenuDemo />
      </div>
    </div>
  );
};

export default Head;
