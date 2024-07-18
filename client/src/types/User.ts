interface User {
  _id: string;
  username: string;
  email: string;
  token?: string;
  favourites?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default User;
