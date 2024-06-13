import React from "react";
import TextField from "../ui/TextField";
import Button from "../ui/Button";

const Auth = () => {
  return (
    <div className="h-screen p-4 md:px-12 md:py-16 lg:px-20">
      <div className="grid h-full grid-rows-2 gap-2 rounded-xl shadow-md md:grid-cols-2 md:grid-rows-1 xl:mx-auto xl:w-[1200px]">
        <div className="rounded-x">
          <h1 className="mt-8 text-center text-4xl font-medium md:mt-20 md:text-5xl">
            Welcome
          </h1>
          <p className="my-1 text-center font-semibold md:mb-10">
            Please enter your details
          </p>
          <form className="px-10 md:px-24">
            <TextField
              label="Username"
              type="text"
              placeholder="Enter your username"
            />
            <TextField
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <Button name="Sign in" />
          </form>
        </div>

        <div className="rounded-xl bg-yellow-300">image</div>
      </div>
    </div>
  );
};

export default Auth;
