'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { div } from '@tensorflow/tfjs';
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
          <button
            type="button"
            onClick={() => {
              setAttendanceDialog(true);
            }}
            className="bg-brand font-bold text-white px-3 py-2 rounded-full  shadow-md hover:bg-brand/80 transition-all"
          >
            Attendance
          </button>
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

{
  /* <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-normal text-3xl -mt-16">Welcome in, {empName}</h1>
        <div className="flex gap-2">
          {attendanceBtn && (
            <button
              type="button"
              onClick={() => {
                setAttendanceDialog(true);
              }}
              className="bg-brand font-bold text-white px-3 py-2 rounded-lg  shadow-md hover:bg-brand/80 transition-all"
            >
              Attendance
            </button>
          )}
          {/* <button
            type="button"
            className="bg-red-500 font-bold text-white px-3 py-2 rounded-lg  shadow-md hover:bg-red-700 transition-all"
            onClick={signOut}
          >
            Logout
          </button> */
}
//     </div>
//   </div>
// </div> */}
