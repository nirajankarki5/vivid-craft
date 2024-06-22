import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [isNavlinkShown, setIsNavlinkShown] = useState<boolean>(false);
  const [prevScrollpos, setPrevScrollpos] = useState<number>(
    window.pageYOffset,
  );
  const [top, setTop] = useState<number>(0);

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
      className="transition-top fixed top-0 z-50 flex h-20 w-full items-center justify-between gap-6 border-b-gray-100 bg-white px-4 duration-300 sm:px-8 md:gap-10 lg:gap-14"
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

      <ul
        className={`${isNavlinkShown ? "absolute left-0 top-[7.5rem] flex w-full flex-col items-center py-6" : "hidden"} gap-6 bg-white sm:flex md:gap-8 lg:gap-10`}
      >
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link
            className="rounded-sm bg-gray-600 px-5 py-2 text-white"
            to="/auth"
          >
            Log&nbsp;in
          </Link>
        </li>
        {/* <Link to="/signup">Sign&nbsp;up</Link> */}
      </ul>
    </nav>
  );
};

export default Navbar;
