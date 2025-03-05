'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const page = () => {
  const session = useSession();
  const router = useRouter();
  const user = session?.data?.user;
  if (user) {
    const role = user.position;
    if (role === 'hr') router.push('/adminDashboard');
    else router.push('/empDashboard');
  }
  const [data, setData] = useState({ email: '', password: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res?.message === 'ok') {
          // window.location.assign('/');
          // router.push('/');
          if (res?.data?.position === 'hr') {
            window.location.assign('/adminDashboard');
          } else {
            window.location.assign('/empDashboard');
          }
        } else {
          router.refresh();
          // window.location.reload();
        }
      });
  };

  return (
    <div className="w-[100vw] flex items-center justify-center">
      <div className="h-[100vh] max-w-7xl w-4/5 p-8 grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center  "
        >
          <h1 className="font-semibold text-3xl w-[20ch]">
            Keep Your Online business organized
          </h1>
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex w-full font-medium mt-5 justify-center items-center gap-2 border-2 border-gray-300 rounded-lg p-2"
          >
            <FcGoogle />
            Sign in with Google
          </button>

          <div className="flex flex-col gap-2 mt-4">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg border-2 "
              required
              value={data.email}
              onChange={(e) => {
                setData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 rounded-lg border-2 "
              required
              value={data.password}
              onChange={(e) => {
                setData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <button
            type="submit"
            className="border-2 rounded-lg w-full text-center mt-6 p-2 shadow-xl font-medium bg-black text-white"
          >
            Login
          </button>
        </form>
        {/* <div className="w-full flex justify-end"> */}
        <div className="relative w-full rotate-180 rounded-lg hidden md:block">
          <Image src={'/heroBg.jpg'} alt="heroBg" fill className="rounded-lg" />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default page;
