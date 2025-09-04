'use client';
import React, { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = useMemo(() => params.get('token') || '', [params]);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error(<p className="font-semibold">Invalid or missing token</p>);
      return;
    }
    if (!password || password.length < 6) {
      toast.error(
        <p className="font-semibold">Password must be at least 6 characters</p>
      );
      return;
    }
    if (password !== confirm) {
      toast.error(<p className="font-semibold">Passwords do not match</p>);
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || 'Reset failed');
      toast.success(
        <p className="font-semibold">Password updated successfully</p>
      );
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      toast.error(
        <p className="font-semibold">
          {err?.message || 'Something went wrong'}
        </p>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-[100vw] flex items-center justify-center p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <h1 className="text-2xl font-semibold">Set a new password</h1>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2 mt-2">
            <label className="font-medium">New password</label>
            <input
              type="password"
              className="p-2 rounded-lg border-2"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="font-medium">Confirm password</label>
            <input
              type="password"
              className="p-2 rounded-lg border-2"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border-2 hover:bg-zinc-800 active:scale-95 transition-all rounded-lg w-full text-center mt-4 p-2 shadow-xl font-medium bg-black text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}
