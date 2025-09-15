'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
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
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    birthDate: '',
    mobile: '',
    email: '',
  });
  const [originalData, setOriginalData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const session = useSession();

  const handleSwitch = (value) => {
    console.log('mode:', value);
    if (value) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleResetPassword = async () => {
    try {
      const email = session?.data?.user?.email;
      if (!email) {
        toast.error(<p className="font-semibold">No email on session</p>);
        return;
      }
      setIsSendingReset(true);
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Unable to send email');
      }
      toast.success(
        <p className="font-semibold">Reset link sent if email exists</p>
      );
    } catch (err) {
      toast.error(
        <p className="font-semibold">
          {err?.message || 'Something went wrong'}
        </p>
      );
    } finally {
      setIsSendingReset(false);
    }
  };

  useEffect(() => {
    if (!originalData) return;
    const dirty = JSON.stringify(editData) !== JSON.stringify(originalData);
    setIsDirty(dirty);
  }, [editData, originalData]);

  const handleEditChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveDetails = async (e) => {
    e?.preventDefault?.();
    try {
      const employeeId = session?.data?.user?.id;
      if (!employeeId) throw new Error('No user session');
      setIsSaving(true);
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to update');
      const json = await res.json();
      if (json?.message === 'success') {
        toast.success(<p className="font-semibold">Details updated</p>);
        setIsEditOpen(false);
        setOriginalData(editData);
      } else {
        throw new Error(json?.message || 'Unable to update');
      }
    } catch (err) {
      toast.error(
        <p className="font-semibold">
          {err?.message || 'Something went wrong'}
        </p>
      );
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = async () => {
    try {
      setIsEditOpen(true);
      setIsFetchingDetails(true);
      const employeeId = session?.data?.user?.id;
      if (!employeeId) throw new Error('No user session');
      const res = await fetch(`/api/employees/${employeeId}`);
      if (!res.ok) throw new Error('Failed to fetch details');
      const json = await res.json();
      const d = json?.data || {};
      const payload = {
        fullName: d.fullName || '',
        gender: d.gender || '',
        maritalStatus: d.maritalStatus || '',
        religion: d.religion || '',
        birthDate: d.birthDate || '',
        mobile: d.mobile || '',
        email: d.email || '',
      };
      setEditData(payload);
      setOriginalData(payload);
    } catch (err) {
      toast.error(
        <p className="font-semibold">
          {err?.message || 'Something went wrong'}
        </p>
      );
    } finally {
      setIsFetchingDetails(false);
    }
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
              onClick={openEditModal}
            >
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-white dark:bg-transparent font-bold hover:text-white   cursor-pointer px-3 py-2 rounded-lg  hover:shadow-xl  transition-all"
              onClick={handleResetPassword}
            >
              {isSendingReset ? 'Sending…' : 'Reset password'}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-white dark:bg-transparent font-bold hover:text-white   cursor-pointer px-3 py-2 rounded-lg  hover:shadow-xl  transition-all"
              onClick={signOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isEditOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsEditOpen(false)}
          />
          <form
            onSubmit={handleSaveDetails}
            className="relative z-10 w-[90%] max-w-xl rounded-2xl border border-white/50 bg-white/20 p-5 shadow-2xl backdrop-blur-xl dark:bg-white/10 dark:text-white"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit your details</h2>
              {isFetchingDetails && (
                <p className="mt-1 text-sm opacity-80">Loading details…</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Full name</label>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => handleEditChange('fullName', e.target.value)}
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none placeholder:text-white/70"
                  disabled={isFetchingDetails}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Gender</label>
                <select
                  value={editData.gender}
                  onChange={(e) => handleEditChange('gender', e.target.value)}
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Marital Status</label>
                <select
                  value={editData.maritalStatus}
                  onChange={(e) =>
                    handleEditChange('maritalStatus', e.target.value)
                  }
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Religion</label>
                <input
                  type="text"
                  value={editData.religion}
                  onChange={(e) => handleEditChange('religion', e.target.value)}
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Birth Date</label>
                <input
                  type="date"
                  value={editData.birthDate}
                  onChange={(e) =>
                    handleEditChange('birthDate', e.target.value)
                  }
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Mobile</label>
                <input
                  type="tel"
                  value={editData.mobile}
                  onChange={(e) => handleEditChange('mobile', e.target.value)}
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="w-full rounded-md border border-white/30 bg-white/5 px-3 py-2 outline-none"
                  disabled={isFetchingDetails}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg bg-red-500/80 px-4 py-2 text-white hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty || isSaving}
                aria-busy={isSaving}
                className={`rounded-lg px-4 py-2 text-white ${
                  !isDirty || isSaving
                    ? 'bg-brand/50 cursor-not-allowed'
                    : 'bg-brand hover:bg-brand/90'
                }`}
              >
                {isSaving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header1;
