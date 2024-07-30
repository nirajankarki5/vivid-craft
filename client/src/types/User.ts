import Image from "./Image";

interface User {
  _id: string;
  username: string;
  email: string;
  uploads?: Image[];
  token?: string;
  favourites?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default User;
