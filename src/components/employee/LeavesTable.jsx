'use client';
import { div } from '@tensorflow/tfjs';
import React, { useState, useEffect } from 'react';

const LeavesTable = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await fetch('/api/leaves/getLeaves')
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res?.message === 'success') {
            setData(res.data);
          }
        });
    };
    getData();
  }, []);

  return (
    <div className="h-full w-full border-[1px] border-white/60 bg-white/5 rounded-xl">
      <div className="p-2 ">
        <table className="w-[100%] items-center">
          <thead className="border-b-[1px]">
            <tr className="grid grid-cols-5 gap-2 text-center text-eprimary dark:text-ewhite font-bold py-2">
              <th>S.No</th>
              <th>Purpose</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="grid grid-cols-5 border-b-[1px] border-black/20 gap-2 mt-1 mb-2 text-center py-1 text-eprimary dark:text-[#BABABA]"
                >
                  <td>{index + 1}</td>
                  <td>{item.purpose}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td
                    className={`${
                      item.status === 'pending'
                        ? 'text-yellow-500'
                        : item.status === 'approved'
                        ? 'text-green-500'
                        : 'text-orange-500'
                    }  capitalize flex items-center gap-2 justify-center`}
                  >
                    <span
                      className={`${
                        item.status === 'pending'
                          ? 'bg-yellow-500'
                          : item.status === 'approved'
                          ? 'bg-green-500'
                          : 'bg-orange-500'
                      } h-2 w-2 rounded-full`}
                    ></span>
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-2">
                  No Leaves requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeavesTable;
