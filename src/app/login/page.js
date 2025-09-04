'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from '@/components/ForgotPassword';

const Page = () => {
  const session = useSession();
  const router = useRouter();
  const user = session?.data?.user;

  // if (user) {
  //   const role = user.position;
  //   if (role === 'hr') router.push('/adminDashboard');
  //   else router.push('/empDashboard');
  // }

  useEffect(() => {
    if (user) {
      const role = user.position;
      if (role === 'hr') {
        router.push('/admin/dashboard');
      } else {
        router.push('/empDashboard');
      }
    }
  }, [user, router]);

  const [data, setData] = useState({ email: '', password: '' });
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      notify('error');
    } else {
      notify('success');
      router.refresh();
    }
  };

  const notify = (type) =>
    type === 'success'
      ? toast.success(<p className="font-semibold">Logged IN!!!</p>)
      : toast.error(<p className="font-semibold">Incorrect Credentials</p>);

  return (
    <div className="w-[100vw] flex items-center justify-center">
      <ToastContainer />
      <div className="h-[100vh] max-w-7xl w-4/5 p-8 grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center"
        >
          <h1 className="font-semibold text-3xl w-[20ch]">
            Keep Your Online Business Organized
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
              className="p-2 rounded-lg border-2"
              required
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 rounded-lg border-2"
              required
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-500">Forgot your password?</span>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setShowForgot(true)}
            >
              Reset password
            </button>
          </div>

          <button
            type="submit"
            className="border-2 hover:bg-zinc-800 active:scale-95 transition-all rounded-lg w-full text-center mt-6 p-2 shadow-xl font-medium bg-black text-white"
          >
            Login
          </button>
        </form>
        <div className="relative w-full rotate-180 rounded-lg hidden md:block">
          <Image src={'/heroBg.jpg'} alt="heroBg" fill className="rounded-lg" />
        </div>
      </div>
      <ForgotPassword
        open={showForgot}
        onClose={() => setShowForgot(false)}
        presetEmail={data.email}
      />
    </div>
  );
};

export default Page;
