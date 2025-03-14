import Image from 'next/image';
import MyLayout from '@/components/MyLayout';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col h-auto transition-all">
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </div>
  );
}
