import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const FAQcard = ({ question, answer }) => {
  const [isopen, setIsopen] = useState(false);
  const Open = () => {
    setIsopen((prev) => !prev);
  };
  return (
    <div
      className="flex flex-col border-b-2 pb-4 cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
      onClick={Open}
    >
      <div className="flex justify-between items-center pr-10">
        <h1 className="text-lg font-medium">{question}</h1>
        {/* {isopen ? <ImCross size={12} /> : <FaPlus size={12} />} */}
        <FaPlus
          size={12}
          className={`${
            isopen ? 'rotate-45' : 'rotate-0'
          } transition-all duration-100`}
        />
      </div>
      <div
        className={`overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isopen ? 'h-auto' : 'h-0'
        }`}
      >
        <p
          className={`transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isopen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQcard;
