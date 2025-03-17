import React from 'react';
import Stats from './Stats';
import Profile from './Profile';

const Section = () => {
  return (
    <div
      className="grid h-[70vh] max-h-[10vh] gap-4 mt-6"
      style={{ gridTemplateColumns: '0.4fr 0.6fr' }}
    >
      <Profile />
      <Stats />
    </div>
  );
};

export default Section;
