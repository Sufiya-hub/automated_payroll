'use client';
import React, { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import axios from 'axios';

const LeaveReport = ({ setViewModal, viewModalData }) => {
  return (
    <div className="absolute inset-0 z-20 bg-black/70 flex flex-col items-center p-6 h-full w-full ">
      <div className="flex flex-col relative bg-white items-center    h-full w-2/4 py-4 px-10 rounded-lg gap-8">
        <h1 className="text-center text-brand font-semibold text-3xl">
          Employee Leave Request
        </h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2  gap-4">
            <p className="text-center text-xl font-medium">Employee Id</p>
            <p className=" text-lg">{viewModalData?.id || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-center text-xl font-medium">Employee Name</p>
            <p className=" text-lg capitalize">{viewModalData?.name || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-center text-xl font-medium">Leave Purpose</p>
            <p className=" text-lg">{viewModalData?.purpose || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-center text-xl font-medium">Leave from</p>
            <p className=" text-lg">{viewModalData?.from || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-center text-xl font-medium">Leave to</p>
            <p className=" text-lg">{viewModalData?.to || ''}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-center text-xl font-medium">Message</p>
            <p className=" text-lg">{viewModalData?.body || ''}</p>
          </div>
        </div>
        <button
          onClick={() => setViewModal(false)}
          className="bg-black text-white px-4 py-2 self-end rounded-lg font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LeaveReport;
