import React from 'react';
import Image from 'next/image';
import { IoLogoReact } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa6';
import { PiChartBarHorizontal } from 'react-icons/pi';

const Features = () => {
  return (
    <div className="flex flex-col gap-6 px-8 py-14 ">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl">Effortless Payroll</h1>
        <p className="md:w-[60ch] text-wrap font-light text-sm">
          On our way: 3 little words that shape everything we do. And we're not
          just talking about a simple ride or meal. Check out our new brand
          campaign.
        </p>
      </div>
      <div className="bg-background px-8 py-4 rounded-2xl ">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <Image
            src="/creditcard.jpg"
            alt="creditcard"
            height={400}
            width={500}
            className="rounded-3xl"
          />
          <div className="grid lg:grid-cols-2 gap-4  ">
            <div className="flex flex-col transition-all bg-white rounded-xl p-4 gap-10">
              <div className="flex gap-4 flex-wrap">
                <IoLogoReact
                  size={40}
                  className="border-2 p-1 rounded-xl bg-gray-100"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-xl">
                    Automated Payroll Processing
                  </h1>
                  <p className="font-light text-sm  text-wrap">
                    Simply payroll with automated calculations,ensuring accurate
                    payments and compliance every time.
                  </p>
                </div>
              </div>
              <div className="border-2 rounded-xl cursor-pointer font-medium flex justify-between items-center px-4 py-3">
                <button>Learn more</button>
                <FaArrowRight />
              </div>
            </div>
            <div className="flex flex-col transition-all bg-white rounded-xl p-4 gap-10  ">
              <div className="flex gap-4 flex-wrap">
                <PiChartBarHorizontal
                  size={40}
                  className="border-2 p-1 rounded-xl bg-gray-100"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-xl">
                    Seamless Tax Management
                  </h1>
                  <p className="font-light text-sm text-wrap">
                    Easily handle tax deductions, fillings, and compliance,
                    saving time and avoiding costly errors.
                  </p>
                </div>
              </div>
              <div className="border-2 rounded-xl cursor-pointer font-medium flex justify-between items-center px-4 py-3">
                <button>Learn more</button>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
