import React, { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import { login } from "../services/apiUser";
import toast from "react-hot-toast";
import { setToken } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";

interface Prop {
  isSignupVisible: boolean;
  setIsSignupVisible: Dispatch<SetStateAction<boolean>>;
}

interface loginBody {
  email: string;
  password: string;
}

const Login: React.FC<Prop> = ({ isSignupVisible, setIsSignupVisible }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const mutation = useMutation({
    mutationFn: (user: loginBody) => login(user),
    onSuccess: (data) => {
      setToken(data?.token);
      navigate(from, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      await mutation.mutate({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

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

        <Button type="submit" disabled={false}>
          Log in
        </Button>
      </form>

      <p className="text-center font-semibold md:mt-4">
        Don't have an account? &nbsp;
        <button
          className="text-blue-800"
          onClick={() => setIsSignupVisible(true)}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
