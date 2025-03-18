'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Navbar from './Navbar';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';

const Header1 = ({ attendanceBtn, setAttendanceDialog, empName }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="z-20 flex justify-between items-center px-4 py-2">
      <h1 className="text-2xl">Welcome...</h1>
      <div className="flex gap-2">
        {attendanceBtn && (
          <div className="rounded-full attendanceBtn mr-4 overflow-hidden  p-[1.5px]">
            <button
              type="button"
              onClick={() => {
                setAttendanceDialog(true);
              }}
              className="bg-brand font-bold text-white h-full px-8 py-2 rounded-full  shadow-md hover:bg-brand/100 transition-all"
            >
              Attendance
            </button>
          </div>
        )}
        <Navbar />
        <button className="flex gap-1 items-center p-4 border-[1px] border-white/90  bg-white/10  rounded-full">
          <IoSettingsOutline size={20} />
        </button>
        <button className="bg-white/10 rounded-full p-4 border-[1px] border-white/90 ">
          <IoMdNotificationsOutline size={20} />
        </button>
        <button
          className="bg-white/10 rounded-full p-4 cursor-pointer  border-[1px] border-white/90"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GoPerson size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header1;
