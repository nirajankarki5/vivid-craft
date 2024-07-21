import User from "../types/User";
import { baseUrl } from "../utils/constants";

export async function login(user: {
  email: string;
  password: string;
}): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data: User = await response.json();

    if (response.status === 404 || response.status === 401) {
      throw new Error("Email or password is incorrect");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUser(token: string | null): Promise<User> {
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const response = await fetch(`${baseUrl}/user/myaccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signup(user: {
  username: string;
  email: string;
  password: string;
}): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.status === 422) {
      throw new Error("Email already exists. Try a different email");
    }
    if (response.status !== 201) {
      throw new Error("An error occured. Try again!!!");
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
