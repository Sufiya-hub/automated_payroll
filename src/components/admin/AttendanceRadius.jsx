'use client';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const AttendanceRadius = () => {
  const [radius, setRadius] = useState('');
  const [initial, setInitial] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/settings/attendanceRadius');
        const json = await res.json();
        const hasRadius = json?.radius !== undefined && json?.radius !== null;
        const r = hasRadius ? String(json.radius) : '';
        setRadius(r);
        setInitial(r);
      } catch (e) {
        toast.error(<p className="font-semibold">Failed to load radius</p>);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      const value = Number(radius);
      if (!Number.isFinite(value) || value <= 0) {
        toast.error(
          <p className="font-semibold">Enter a valid positive number</p>
        );
        return;
      }
      setSaving(true);
      const res = await fetch('/api/settings/attendanceRadius', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ radius: value }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const json = await res.json();
      if (json?.message === 'success') {
        toast.success(<p className="font-semibold">Radius updated</p>);
        setInitial(String(value));
      } else {
        throw new Error(json?.message || 'Unable to save');
      }
    } catch (e) {
      toast.error(
        <p className="font-semibold">{e?.message || 'Something went wrong'}</p>
      );
    } finally {
      setSaving(false);
    }
  };

  const isDirty = radius !== initial;

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Attendance Radius</h2>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          step={1}
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          disabled={loading}
          className="w-40 rounded-md border px-3 py-2 outline-none"
          placeholder="in meters"
        />
        <button
          onClick={handleSave}
          disabled={!isDirty || saving || loading}
          className={`rounded-lg px-4 py-2 text-white ${
            !isDirty || saving || loading
              ? 'bg-brand/50 cursor-not-allowed'
              : 'bg-brand hover:bg-brand/90'
          }`}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      <p className="mt-2 text-sm opacity-70">
        Set the maximum radius (meters) within which employees can submit
        attendance.
      </p>
      <ToastContainer />
    </div>
  );
};

export default AttendanceRadius;
