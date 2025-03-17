import React, { useState, useEffect } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import axios from 'axios';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const Header = ({ empName, imageName, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('/api/employees').then((res) => {
      if (res?.data?.message === 'success') {
        setData(res.data.data);
      }
    });
  }, []);
  return (
    <div className="relative flex gap-2 justify-end items-center text-sm font-medium">
      <div className="flex gap-2 bg-white p-1 rounded-full">
        <h1 className="hover:text-white hover:bg-black p-2 rounded-full cursor-pointer">
          Dashboard
        </h1>
        <h1 className="hover:text-white hover:bg-black p-2 rounded-full cursor-pointer">
          Transactions
        </h1>
      </div>
      <h1 className="flex gap-1 items-center hover:bg-black hover:text-white bg-white p-2 rounded-full cursor-pointer">
        <IoSettingsOutline size={20} />
      </h1>
      <button className="bg-white rounded-full p-2  hover:bg-black hover:text-white">
        <IoMdNotificationsOutline size={20} />
      </button>
      <div className="">
        <button
          className="bg-white rounded-full p-2  hover:bg-black hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GoPerson size={20} />
        </button>
        {isOpen && (
          <div className="absolute mt-6">
            <div>
              <Image
                src={`/employees/${imageName}`}
                alt=""
                width={100}
                height={100}
              />
              <h1>{empName}</h1>
              <h1>{position}</h1>
              <button
                type="button"
                className="bg-red-500 font-bold text-white px-3 py-2 rounded-lg  shadow-md hover:bg-red-700 transition-all"
                onClick={signOut}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
