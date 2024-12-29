import React from 'react';
import Image from 'next/image';
import { MdArrowOutward } from 'react-icons/md';

const Hero = () => {
  return (
    <div className="flex  justify-between bg-background h-[90vh] px-8">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-5xl font-bold">Get paid early</h1>
        <h1 className="text-5xl font-medium w-[16ch]">
          save automatically all your pay.
        </h1>
        <p className="w-[50ch] text-sm">
          Support small businesses with simple invoicing, powerful integrations,
          and cash flow management tools.
        </p>
        <button className=" flex gap-3 shadow-lg items-center font-medium border-none mt-4 bg-brand self-start px-4 py-2 rounded-lg text-white">
          Get Started <MdArrowOutward size={20} />
        </button>
      </div>
      <div className="flex">
        <Image src="/pay.jpg" alt="pay" height={500} width={800}></Image>
      </div>
    </div>
  );
};

export default Hero;
