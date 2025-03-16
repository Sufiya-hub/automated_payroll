import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';

const Header = () => {
  return (
    <div className="flex gap-2 justify-end items-center text-sm font-medium">
      <div className="flex gap-2 bg-white p-1 rounded-full">
        <h1 className="hover:text-white hover:bg-black p-2 rounded-full cursor-pointer">
          Dashboard
        </h1>
        <h1 className="hover:text-white hover:bg-black p-2 rounded-full cursor-pointer">
          Transactions
        </h1>
        <h1 className="hover:text-white hover:bg-black p-2 rounded-full cursor-pointer">
          Salary
        </h1>
      </div>
      <h1 className="flex gap-1 items-center bg-white px-4 py-2 rounded-full cursor-pointer">
        <IoSettingsOutline /> Settings
      </h1>
      <h1 className="bg-white rounded-full p-2 cursor-pointer">
        <IoMdNotificationsOutline size={20} />
      </h1>
      <h1 className="bg-white rounded-full p-2 cursor-pointer">
        <GoPerson size={20} />
      </h1>
    </div>
  );
};

export default Header;
