import React, { useState, useEffect } from 'react';
import Progress from './Progress';
import TimeTracker from './TimeTracker';
import TransactionTable from './TransactionTable';

function convertToISO(dateStr) {
  const [month, day, year] = dateStr.split('/'); // Split by "/"
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format as YYYY-MM-DD
}

function convertToMMDDYYYY(dateStr) {
  const [year, month, day] = dateStr.split('-'); // Split by "-"
  return `${parseInt(month)}/${parseInt(day)}/${year}`; // Convert to M/D/YYYY
}

function getDaysInCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0-11, so add 1
  return new Date(year, month, 0).getDate(); // Day 0 of next month gives last day of current month
}

function getCurrentMonthDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    result.push({
      status: false,
      date: `${month + 1}/${day}/${year}`, // Format: MM/DD/YYYY
      day: date.toLocaleDateString('en-US', { weekday: 'long' }), // Get full day name
    });
  }
  // console.log(result);

  return result;
}
const Stats = () => {
  const [attendance, setAttendance] = useState();
  const [days, setDays] = useState(getDaysInCurrentMonth());

  useEffect(() => {
    if (days) {
      const monthDates = getCurrentMonthDates();
      setAttendance(monthDates);

      const getAttendance = async () => {
        await fetch('/api/attendance', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log('res', res);
            try {
              if (res?.message === 'success') {
                let updatedData;
                res?.data?.map((item) => {
                  // console.log(monthDates);
                  const date1 = convertToMMDDYYYY(item?.attendanceDate);
                  updatedData = updatedData
                    ? updatedData?.map((ele) =>
                        ele.date === date1 ? { ...ele, status: true } : ele
                      )
                    : monthDates?.map((ele) =>
                        ele.date === date1 ? { ...ele, status: true } : ele
                      );
                  // console.log('up:', updatedData);
                  if (updatedData?.length !== 0) setAttendance(updatedData);
                });
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch(() => {
            setAttendance(monthDates);
          });
      };
      getAttendance();
    }
  }, [days]);

  return (
    <div className="grid grid-rows-2 h-full gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Progress attendance={attendance} />
        <TimeTracker attendance={attendance} />
      </div>
      <div className="h-full w-full border-[1px] border-white/60 bg-white/5 rounded-xl">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Stats;
