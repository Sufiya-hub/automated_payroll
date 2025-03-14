import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';
import Faq from './Faq';
import Payslip from './Payslip';

const MyLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </div>
  );
};

export default MyLayout;
// font-family: "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
