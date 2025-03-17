'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const Header1 = ({ attendanceBtn, setAttendanceDialog, empName }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-normal text-3xl">Welcome in, {empName}</h1>
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
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header1;
