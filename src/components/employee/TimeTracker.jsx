import React, { useState, useEffect } from 'react';
import { MdArrowOutward } from 'react-icons/md';

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

const getStartDayOffset = () => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const firstDay = new Date(currYear, currMonth, 1).getDay();
  return firstDay; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
};

const TimeTracker = () => {
  const [attendance, setAttendance] = useState();
  const startOffset = getStartDayOffset();

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
  // console.log(attendance);
  return (
    <div className="flex flex-col gap-3 px-7 py-4 shadow-lg rounded-2xl bg-background w-[50%]">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl text-gray-700">
          Month Attendance
        </h1>
        {/* <div className="border-2 border-white rounded-full p-2 bg-white">
          <MdArrowOutward size={20} />
        </div> */}
      </div>
      <div className="grid grid-cols-7 gap-5 font-semibold text-black/80">
        <p>S</p>
        <p>M</p>
        <p>T</p>
        <p>W</p>
        <p>T</p>
        <p>F</p>
        <p>S</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startOffset }).map((_, index) => (
          <div key={`empty-${index}`} className="h-6 w-6"></div>
        ))}

        {attendance?.map((el, i) => (
          <div
            className={`h-6 w-6 text-white/70 flex justify-center items-center font-semibold text-xs ${
              el.day === 'Sunday' || el.day === 'Saturday'
                ? 'bg-white border border-gray-200 text-gray-200'
                : el.status
                ? 'bg-green-600'
                : 'bg-green-200  border-green-800'
            } rounded-full`}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracker;
