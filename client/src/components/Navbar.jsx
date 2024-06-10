import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [isNavlinkShown, setIsNavlinkShown] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [top, setTop] = useState(0);

  useEffect(() => {
    // Make navbar hide and appear when user scrolls down
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setTop(0);
      } else {
        setTop(-85);
      }
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  return (
    <nav
      style={{ top: `${top}px` }}
      className="transition-top fixed top-0 flex h-20 w-full items-center justify-between gap-6 border-b-gray-100 bg-white px-8 duration-300 md:gap-10 lg:gap-14"
    >
      <Link
        to={"/"}
        className="flex items-center gap-2 font-serif text-2xl font-semibold text-[#555]"
      >
        <img className="h-10" src={logo} alt="vivid craft logo" />
        <p className="w-36 leading-6">Vivid Craft</p>
      </Link>

      <FaBars
        onClick={() => setIsNavlinkShown(!isNavlinkShown)}
        className="cursor-pointer text-2xl sm:hidden"
      />

      <form
        className={`${isNavlinkShown ? "absolute left-0 top-16 flex h-14" : "hidden"} w-full items-center gap-4 bg-white px-4 sm:flex sm:h-10 lg:h-12 lg:w-[50rem]`}
      >
        <FaMagnifyingGlass className="text-gray-400" />
        <input
          className="h-full w-full focus:outline-none"
          type="text"
          placeholder="Search image..."
        />
      </form>

      <div
        className={`${isNavlinkShown ? "absolute left-0 top-[7.5rem] flex w-full flex-col items-center py-6" : "hidden"} gap-6 bg-white sm:flex md:gap-10 lg:gap-14`}
      >
        <Link to="/about">About</Link>
        <Link to="/login">Log&nbsp;in</Link>
        <Link to="/signup">Sign&nbsp;up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
