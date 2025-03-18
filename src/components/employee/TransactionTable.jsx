'use client';
import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await fetch('/api/payroll/getPayrolls')
        .then((res) => res.json())
        .then((res) => {
          if (res?.message === 'success') {
            setData(res.data);
          }
        });
    };
    getData();
  }, []);

  return (
    <div className="p-2">
      <table className="w-[100%] items-center">
        <thead className="border-b-[1px]">
          <tr className="grid grid-cols-5 gap-2 text-center text-eprimary font-bold py-2">
            <th>Payroll Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Purpose</th>
            <th>Tax</th>
          </tr>
        </thead>
        {/* <hr /> */}
        <tbody>
          {data ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="grid grid-cols-5 gap-2 text-center py-1 text-eprimary"
              >
                <td>{item.id}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.amount}</td>
                <td>{item.purpose}</td>
                <td>{item.tax}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-2">
                No payroll records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
