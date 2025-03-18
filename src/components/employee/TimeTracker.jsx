import React, { useState, useEffect } from 'react';

const getStartDayOffset = () => {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
  const firstDay = new Date(currYear, currMonth, 1).getDay();
  return firstDay; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
};

const TimeTracker = ({ attendance }) => {
  const startOffset = getStartDayOffset();

  return (
    <div
      className={`flex flex-col gap-3 px-7 py-4 backdrop-blur-lg rounded-xl bg-white/5 border-[1px] border-white/60 w-full transition-all duration-500 overflow-hidden ${
        attendance?.length ? 'max-h-[400px]' : 'max-h-[100px]'
      }`}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl text-ehighlight">Attendance</h1>
      </div>
      <div className="grid grid-cols-7 gap-5 font-semibold text-eprimary/90">
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
            className={`h-6 w-6 font-light text-white/70 flex justify-center items-center text-xs ${
              el.day === 'Sunday' || el.day === 'Saturday'
                ? 'border-[1px] border-eprimary/50 text-eprimary'
                : el.status
                ? 'bg-brand border-white/50 text-[#F1F1F1]'
                : 'bg-eprimary text-black'
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
