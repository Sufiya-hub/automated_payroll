import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const FAQcard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col border-b-2 pb-4 cursor-pointer transition-all duration-500 ease-in-out"
      onClick={toggleOpen}
    >
      {/* Question + Icon */}
      <div className="flex justify-between items-center pr-10">
        <h1 className="text-lg font-medium">{question}</h1>
        <FaPlus
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        />
      </div>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default FAQcard;
