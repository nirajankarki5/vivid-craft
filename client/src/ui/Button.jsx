import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button
      className="bg-primary-color my-4 h-10 w-full rounded-md font-semibold text-white"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
