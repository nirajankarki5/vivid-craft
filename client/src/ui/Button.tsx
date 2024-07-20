import { ReactNode } from "react";

interface Prop {
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}

const Button: React.FC<Prop> = ({ onClick, type, children }) => {
  return (
    <button
      className="my-4 h-10 w-full rounded-md bg-primary-color font-semibold text-white"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
