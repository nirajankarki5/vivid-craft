import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex justify-between  px-6 py-4">
      <img className="h-16" src={logo} alt="vivid craft logo" />

      <form className="flex h-10 items-center gap-2 rounded-full bg-gray-100 px-4">
        <FaMagnifyingGlass />
        <input
          className="h-full bg-gray-100"
          type="text"
          placeholder="Search image..."
        />
      </form>

      <div className="flex gap-4">
        <Link to="/about">About</Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
