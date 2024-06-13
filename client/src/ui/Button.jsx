import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button
      className="my-4 h-10 w-full rounded-md bg-indigo-900 font-semibold text-white"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
