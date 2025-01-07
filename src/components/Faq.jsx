'use client';
import React, { useState } from 'react';

import { FAQ } from '@/constants';
import FAQcard from './FAQcard';

const Faq = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-8 py-8 justify-between">
      <div className="flex flex-col gap-2 w-[50%]">
        <h1 className="text-brand font-medium">FAQ</h1>
        <h1 className="md:text-5xl text-3xl font-semibold w-[15ch]">
          Frequently asked questions
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-4 w-full lg:w-[50%] lg:pr-10">
        {FAQ.map((item, index) => (
          <FAQcard key={index} question={item.que} answer={item.ans} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
