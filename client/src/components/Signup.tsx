import React, { Dispatch, SetStateAction, useState } from "react";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

interface Prop {
  isSignupVisible: boolean;
  setIsSignupVisible: Dispatch<SetStateAction<boolean>>;
}

const Signup: React.FC<Prop> = ({ isSignupVisible, setIsSignupVisible }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password !== repassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(username, email, password, repassword);
  };

  return (
    <div
      className={`absolute top-0 z-40 w-full translate-x-[-100%] transition-all duration-500 md:w-full ${isSignupVisible ? "translate-x-[0%]" : "opacity-0]"}`}
    >
      <h1 className="mt-8 text-center text-4xl font-medium md:mt-20 md:text-5xl">
        Sign up
      </h1>
      <p className="my-1 text-center font-semibold md:mb-10">
        Please enter your details
      </p>
      <form onSubmit={handleSubmit} className="px-4 sm:px-14 md:px-8 xl:px-24">
        <TextField
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <TextField
          label="Re-enter password"
          type="password"
          placeholder="Enter your password"
          value={repassword}
          onChange={(e) => {
            setRepassword(e.target.value);
            setError("");
          }}
          required={true}
        />

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <Button type="submit">Sign up</Button>
      </form>

      <p className="text-center font-semibold md:mt-4">
        Already have an account? &nbsp;
        <button
          className="text-blue-800"
          onClick={() => setIsSignupVisible(false)}
        >
          Log in
        </button>{" "}
      </p>
    </div>
  );
};

export default Signup;
