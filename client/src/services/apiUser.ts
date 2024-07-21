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
    if (response.status !== 200) {
      throw new Error("An error occured");
    }

    const data: User = await response.json();
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
