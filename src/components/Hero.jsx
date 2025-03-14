import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

const Hero = () => {
  return (
    <div className="flex justify-around bg-background h-[90vh] px-8">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="md:text-5xl text-4xl font-bold">Get paid early</h1>
        <h1 className="md:text-5xl text-3xl font-medium w-[16ch]">
          save automatically all your pay.
        </h1>
        <p className="text-wrap md:w-[50ch]  text-sm">
          Support small businesses with simple invoicing, powerful integrations,
          and cash flow management tools.
        </p>
        <Link href={'/login'}>
          <button className=" flex gap-3 hover:shadow-lg transition-all items-center font-medium border-none mt-4 bg-brand self-start px-4 py-2 rounded-lg text-white">
            Get Started <MdArrowOutward size={20} />
          </button>
        </Link>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div className="">
          <Image src="/dashboard.png" alt="pay" height={200} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
