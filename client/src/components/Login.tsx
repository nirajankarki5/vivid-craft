import React, { Dispatch, SetStateAction } from "react";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

interface Prop {
  isSignupVisible: boolean;
  setIsSignupVisible: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Prop> = ({ isSignupVisible, setIsSignupVisible }) => {
  return (
    <div
      className={`${isSignupVisible ? "opacity-0" : "transition-all duration-500"}`}
    >
      <h1 className="mt-8 text-center text-4xl font-medium md:mt-20 md:text-5xl">
        Welcome
      </h1>
      <p className="my-1 text-center font-semibold md:mb-10">
        Please enter your details
      </p>
      <form className="px-4 sm:px-14 md:px-8 xl:px-24">
        <TextField
          label="Username"
          type="text"
          placeholder="Enter your username"
        />
        <TextField label="Email" type="email" placeholder="Enter your email" />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button onClick={() => console.log("click")}>Log in </Button>
      </form>

      <p className="text-center font-semibold md:mt-4">
        Don't have an account? &nbsp;
        <button
          className="text-blue-800"
          onClick={() => setIsSignupVisible(true)}
        >
          Sign up
        </button>{" "}
      </p>
    </div>
  );
};

export default Login;
