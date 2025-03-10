import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { MdFacebook } from 'react-icons/md';

const Footer = () => {
  return (
    <section className="px-8 flex flex-col md:flex-row gap-8 justify-between py-10 bg-background ">
      <h1 className="font-bold text-3xl">
        Effortless<span className="text-brand">Pay</span>
      </h1>
      <div className="flex gap-6 lg:gap-24">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl">Solutions</h1>
          <h1>Small Business</h1>
          <h1>Freelancers</h1>
          <h1>Customers</h1>
          <h1>Taxes</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl">Company</h1>
          <h1>About Us</h1>
          <h1>Career</h1>
          <h1>Contact</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl">Learn</h1>
          <h1>Blog</h1>
          <h1>Ebooks</h1>
          <h1>Guides</h1>
          <h1>Templates</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 mr-10">
        <h1 className="font-medium ">Follow us on</h1>
        <div className="flex gap-4 cursor-pointer">
          <FaTwitter size={25} />
          <FaLinkedin size={25} />
          <MdFacebook size={25} />
        </div>
      </div>
    </section>
  );
};

export default Footer;
