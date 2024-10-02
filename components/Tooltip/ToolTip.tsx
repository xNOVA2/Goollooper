import React from "react";

const Tooltip = ({ message }: { message: string }) => {
  return (
    <div className="relative inline-block w-10">
      <div className="absolute whitespace-nowrap h-[3.7em] -left-2 top-3 -translate-x-full -translate-y-1/2 bg-white rounded shadow-md p-2 flex items-center">
        <p className="text-red-500 text-sm mr-2">{message}</p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rotate-45 w-2 h-2 bg-white"></div>
      </div>
    </div>
  );
};

export default Tooltip;
