type prop = {
  name: String;
  onClick: () => void;
};

const Button: React.FC<prop> = ({ name, onClick }) => {
  return (
    <button
      className="my-4 h-10 w-full rounded-md bg-primary-color font-semibold text-white"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
