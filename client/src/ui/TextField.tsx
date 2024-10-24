interface Prop {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   ...
// }
// const TextField: React.forwardRef<HTMLInputElement, Prop> = ({...}) => {...}

const TextField: React.FC<Prop> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
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
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};

export default TextField;
