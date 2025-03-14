import React from 'react';
import { DropdownMenuDemo } from '../DropMenu';

const Head = ({ empName }) => {
  return (
    <div className="px-4 py-2 flex justify-between items-center mr-8">
      <h1 className="font-medium text-lg">Hello, {empName}</h1>

      <DropdownMenuDemo />
    </div>
  );
};

export default Head;
