import { ReactNode } from "react";

interface prop {
  onClick: () => void;
  children: ReactNode;
}

const Button: React.FC<prop> = ({ onClick, children }) => {
  return (
    <button
      className="my-4 h-10 w-full rounded-md bg-primary-color font-semibold text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
