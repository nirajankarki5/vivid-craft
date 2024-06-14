import React from "react";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

const Signup = ({ isSignupVisible, setIsSignupVisible }) => {
  return (
    <div
      className={`absolute top-0 z-40 w-full translate-x-[-100%] transition-all duration-500 md:w-full ${isSignupVisible ? "translate-x-0" : "opacity-0"}`}
    >
      <h1 className="mt-8 text-center text-4xl font-medium md:mt-20 md:text-5xl">
        Sign up
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
        <TextField
          label="Re-enter password"
          type="password"
          placeholder="Enter your password"
        />

        <Button name="Sign up" />
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
