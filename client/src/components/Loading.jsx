import React from "react";

const Loading = () => {
  return (
    <div className="flex h-[45px] w-9 items-center justify-between">
      <div className="animate-grow1 h-full w-[3.5px] bg-[#555]"></div>
      <div className="animate-grow2 h-full w-[3.5px] bg-[#555]"></div>
      <div className="animate-grow3 h-full w-[3.5px] bg-[#555]"></div>
      <div className="animate-grow4 h-full w-[3.5px] bg-[#555]"></div>
    </div>
  );
};

export default Loading;
