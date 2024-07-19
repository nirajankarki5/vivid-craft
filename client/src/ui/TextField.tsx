interface Prop {
  label: string;
  type: string;
  placeholder: string;
}

const TextField: React.FC<Prop> = ({ label, type, placeholder }) => {
  return (
    <>
      <label
        className="mb-1 block text-sm font-semibold md:text-base"
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className="mb-1 h-9 w-full rounded-md border-[1px] border-gray-300 p-2 md:mb-4 md:h-10"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextField;
