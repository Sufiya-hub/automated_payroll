import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-16 h-16">
        <div className="w-12 h-12 border-8 border-brand border-dotted rounded-full animate-spin-slow2"></div>

        {/* <div className="absolute w-full h-full border-8 border-t-transparent border-blue-500 rounded-full animate-spin-slow"></div> */}
        {/* <div className="absolute w-full h-full border-8 border-t-transparent border-brand rounded-full animate-spin-slow2"></div>
        <div className="absolute w-full h-full border-8 border-t-transparent border-pink-600 rounded-full animate-spin-fast"></div> */}
      </div>
    </div>
  );
};

export default Spinner;
