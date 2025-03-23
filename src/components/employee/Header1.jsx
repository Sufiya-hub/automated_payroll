'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Navbar from './Navbar';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Header1 = ({
  attendanceBtn,
  setAttendanceDialog,
  empName,
  setApplyLeave,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = (value) => {
    console.log('mode:', value);
    if (value) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <div className="z-20 flex justify-between items-center px-4 py-2">
      <h1 className="text-4xl dark:text-ewhite">Welcome...</h1>
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
        <button
          className=" outline-none rounded-full px-4 py-2 bg-empbg2/30 dark:bg-white/10 border-[1px] border-white/90 dark:border-white/30 dark:text-ewhite/80 "
          onClick={() => setApplyLeave(true)}
        >
          Apply Leave
        </button>
        <DropdownMenu className="">
          <DropdownMenuTrigger className="" asChild>
            <button className="flex gap-1 outline-none items-center p-4 border-[1px] border-white/90  bg-white/10  rounded-full dark:border-white/30 dark:text-ewhite/80">
              <IoSettingsOutline size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <div className="flex items-center space-x-2 p-2">
              <Switch id="dark-mode" onCheckedChange={handleSwitch} />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="bg-white/10 outline-none  rounded-full p-4 border-[1px] border-white/90 dark:border-white/30 dark:text-ewhite/80">
          <IoMdNotificationsOutline size={20} />
        </button>

        <DropdownMenu className="">
          <DropdownMenuTrigger className="" asChild>
            <button className="bg-white/10 outline-none rounded-full p-4 cursor-pointer  border-[1px] border-white/90 dark:border-white/30 dark:text-ewhite/80">
              <GoPerson size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem
              className="bg-white dark:bg-transparent font-bold hover:text-white   cursor-pointer px-3 py-2 rounded-lg  hover:shadow-xl  transition-all"
              onClick={signOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header1;
