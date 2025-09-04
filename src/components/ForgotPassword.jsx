'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword({ open, onClose, presetEmail = '' }) {
  const [email, setEmail] = useState(presetEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const toSend = (email || presetEmail).trim();
    if (!toSend) {
      toast.error(<p className="font-semibold">Please enter your email</p>);
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: toSend }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Unable to send reset email');
      }
      toast.success(
        <p className="font-semibold">
          If that email exists, a reset link was sent.
        </p>
      );
      onClose?.();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold">Reset password</h2>
        <p className="text-sm text-gray-600 mt-1">
          Enter your account email to receive a reset link.
        </p>
        <form onSubmit={onSubmit} className="mt-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="p-2 rounded-lg border-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border bg-black text-white disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : 'Send link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
