import React from 'react';

const Header1 = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-normal text-3xl">Welcome in, Employee</h1>
      <div className="flex self-end gap-6">
        <div>
          <h1 className="text-5xl font-light">78</h1>
        </div>
        <div>
          <h1 className="text-5xl font-light">56</h1>
        </div>
        <div>
          <h1 className="text-5xl font-light">203</h1>
        </div>
      </div>
    </div>
  );
};

export default Header1;
