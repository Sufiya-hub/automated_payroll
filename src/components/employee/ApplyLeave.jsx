'use client';
import React, { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ApplyLeave = ({ setApplyLeave }) => {
  const [data, setData] = useState({ purpose: '', from: '', to: '', body: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/leaves', JSON.stringify(data)).then((res) => {
      if (res?.data?.message === 'success') {
        notify('success');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        notify('error');
      }
    });
  };
  const notify = (type) =>
    type === 'success'
      ? toast.success(<p className="font-semibold">Sent Leave Report </p>)
      : toast.error(<p className="font-semibold">Can't send Leave Report</p>);
  return (
    <div className="absolute inset-0 z-20 bg-black/70 flex flex-col items-center p-6 h-full w-full ">
      <div className="flex flex-col relative bg-white  dark:bg-empaccent dark:border-[1px] dark:border-white/50 dark:text-white h-full w-3/4 py-4 px-10 rounded-lg gap-4">
        <h1 className="font-medium text-3xl text-center mb-4 text-brand">
          Apply Leave
        </h1>
        <button
          className=" transition-all absolute right-6 text-black dark:text-white rounded-full p-2"
          onClick={() => setApplyLeave(false)}
        >
          <ImCross size={15} />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-medium text-lg">
              Employee Name
            </label>
            <h1 className="bg-white rounded-lg p-2 text-black w-[250px]">
              Sufiya
            </h1>
          </div> */}
          <div className="flex gap-4 lg:gap-20 items-center">
            <label htmlFor="" className="font-medium text-lg">
              Purpose of leave
            </label>
            <select
              name=""
              id=""
              value={data.purpose}
              onChange={(e) =>
                setData((prev) => ({ ...prev, purpose: e.target.value }))
              }
              className="flex flex-col border-[2px] text-black outline-none rounded-lg  p-2"
            >
              <option value="" hidden>
                Select leave type...
              </option>
              <option value="Vacation Leave"> Vacation Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Sabbatical Leave"> Sabbatical Leave</option>
              <option value="Festival Holidays">Festival Holidays</option>
            </select>
          </div>
          <div className="flex gap-4 lg:gap-16">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-lg">
                From
              </label>
              <input
                type="date"
                value={data.from}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, from: e.target.value }))
                }
                className="outline-none border-[2px] rounded-lg text-black p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-lg">
                To
              </label>
              <input
                type="date"
                value={data.to}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, to: e.target.value }))
                }
                className="outline-none border-[2px] rounded-lg text-black p-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="font-medium text-lg">
              Body
            </label>
            <textarea
              name=""
              id=""
              cols="50"
              rows="10"
              value={data.body}
              onChange={(e) =>
                setData((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Enter your message here ..."
              className="outline-none border-[2px] rounded-lg text-black p-4 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-brand text-white py-2 px-4 rounded-lg font-medium self-end"
          >
            Apply Leave
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ApplyLeave;
