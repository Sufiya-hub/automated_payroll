import React from 'react';
import Stats from './Stats';
import Profile from './Profile';
import LeavesTable from './LeavesTable';

const Section = ({ empName, imageName, position }) => {
  return (
    <div
      className="grid h-[70vh] max-h-[10vh] gap-4 mt-6"
      style={{ gridTemplateColumns: '0.45fr 0.65fr' }}
    >
      <div className="grid grid-rows-2 gap-2">
        <Profile imageName={imageName} empName={empName} position={position} />
        <LeavesTable />
      </div>
      <Stats />
    </div>
  );
};

export default Section;
