'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

function getDayRatios(data) {
  const dayCounts = {};

  // Count occurrences and `true` statuses per day
  data.forEach(({ day, status }) => {
    if (!dayCounts[day]) {
      dayCounts[day] = { total: 0, trueCount: 0 };
    }
    dayCounts[day].total++;
    if (status) {
      dayCounts[day].trueCount++;
    }
  });

  const output = Object.fromEntries(
    Object.entries(dayCounts).map(([day, { total, trueCount }]) => [
      day.toLowerCase(),
      (trueCount / total) * 200,
    ])
  );

  // console.log(output);
  // Convert to desired format as an object
  return output;
}

const Progress = ({ attendance }) => {
  const progressBars = useRef();
  const [progress, setProgress] = useState();
  useEffect(() => {
    if (attendance) setProgress(getDayRatios(attendance));
  }, [attendance]);
  // console.log('progress: ', progress);
  return (
    <div className="flex flex-col gap-3 px-7 py-4  rounded-xl bg-white/5 border-[1px] border-white/60 w-full text-ehighlight h-auto transition-all">
      <div className="flex justify-between">
        <h1 className="font-medium text-2xl dark:text-ewhite">Progress</h1>
      </div>

      <div className="grid grid-cols-7 mt-4 gap-3 h-full">
        <div className="flex flex-col items-center justify-end">
          <div
            className="h-0 bg-eprimary w-[6px] rounded-3xl transition-all"
            ref={progressBars[0]}
          ></div>
          <div
            className="h-0 bg-eprimary dark:bg-white/40 w-[6px] rounded-3xl"
            style={{ height: progress && progress['sunday'] }}
          ></div>
          <div className="text-eprimary dark:text-white/40">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            S
          </h1>
        </div>
        <div
          className="flex flex-col items-center justify-end"
          ref={progressBars[1]}
        >
          <div
            className="h-0 bg-eprimary dark:bg-lwhite w-[6px] rounded-3xl transition-all"
            style={{ height: progress && progress['monday'] }}
          ></div>
          <div className="text-eprimary dark:text-lwhite">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            M
          </h1>
        </div>
        <div
          className="flex flex-col items-center justify-end"
          ref={progressBars[2]}
        >
          <div
            className="h-0 bg-eprimary dark:bg-lwhite w-[6px] rounded-3xl"
            style={{ height: progress && progress['tuesday'] }}
          ></div>
          <div className="text-eprimary dark:text-lwhite">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            T
          </h1>
        </div>
        <div className="flex flex-col items-center justify-end">
          <div
            className="h-0 bg-eprimary dark:bg-lwhite w-[6px] rounded-3xl"
            style={{ height: progress && progress['wednesday'] }}
          ></div>
          <div className="text-eprimary dark:text-lwhite">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            W
          </h1>
        </div>
        <div className="flex flex-col items-center justify-end">
          <div
            className="h-0 bg-eprimary dark:bg-lwhite w-[6px] rounded-3xl"
            style={{ height: progress && progress['thursday'] }}
          ></div>
          <div className="text-eprimary dark:text-lwhite">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            T
          </h1>
        </div>
        <div className="flex flex-col items-center justify-end">
          <div
            className="h-0 bg-eprimary dark:bg-lwhite w-[6px] rounded-3xl"
            style={{ height: progress && progress['friday'] }}
          ></div>
          <div className="text-eprimary dark:text-lwhite">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            F
          </h1>
        </div>
        <div className="flex flex-col items-center justify-end">
          <div
            className="h-0 bg-eprimary dark:bg-white/40 w-[6px] rounded-3xl"
            style={{ height: progress && progress['saturday'] }}
          ></div>
          <div className="text-eprimary dark:text-white/40">
            <GoDotFill />
          </div>
          <h1 className="text-eprimary/90 dark:text-ewhite/60 font-semibold">
            S
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Progress;
