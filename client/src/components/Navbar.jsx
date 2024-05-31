import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [isNavlinkShown, setIsNavlinkShown] = useState(false);

  return (
    <nav className="relative flex items-center justify-between gap-6 border-b-gray-100 px-8 py-4 md:gap-10 lg:gap-14">
      <img className="h-16" src={logo} alt="vivid craft logo" />

      <FaBars
        onClick={() => setIsNavlinkShown(!isNavlinkShown)}
        className="cursor-pointer text-2xl sm:hidden"
      />

      <form
        className={`${isNavlinkShown ? "absolute left-0 top-24 flex" : "hidden"} h-10 w-full items-center gap-2 rounded-full bg-gray-100 px-4 sm:flex lg:h-12 lg:w-[50rem]`}
      >
        <FaMagnifyingGlass />
        <input
          className="h-full w-full bg-gray-100 focus:outline-none"
          type="text"
          placeholder="Search image..."
        />
      </form>

      <div
        className={`${isNavlinkShown ? "absolute top-40 flex" : "hidden"} gap-6 sm:flex md:gap-10 lg:gap-14`}
      >
        <Link to="/about">About</Link>
        <Link to="/login">Log&nbsp;in</Link>
        <Link to="/signup">Sign&nbsp;up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
