import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";
import { PiUploadSimple } from "react-icons/pi";
import { isLoggedIn } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavlinkShown, setIsNavlinkShown] = useState<boolean>(false);
  const [prevScrollpos, setPrevScrollpos] = useState<number>(
    window.pageYOffset,
  );
  const [top, setTop] = useState<number>(0);

  const navigate = useNavigate();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchTerm) {
      toast.error("Please enter a search term");
      return;
    }
    navigate("/search?tag=" + searchTerm);
  };

  return (
    <nav style={{ top: `${top}px` }}>
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
        onSubmit={handleSubmit}
        className={`${isNavlinkShown ? "absolute left-0 top-16 flex h-14" : "hidden"} w-full items-center gap-4 bg-white px-4 sm:flex sm:h-10 lg:h-12 lg:w-[50rem]`}
      >
        <FaMagnifyingGlass className="text-gray-400" />
        <input
          className="h-full w-full focus:border-b-[1px] focus:border-gray-400 focus:outline-none"
          type="text"
          placeholder="Search image..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <ul
        className={`${isNavlinkShown ? "absolute left-0 top-[7.5rem] flex w-full flex-col flex-wrap items-center gap-4 py-6" : "hidden"}  bg-white sm:flex md:gap-4 lg:gap-6`}
      >
        <li className="flex items-center">
          <Link
            to="/about"
            onClick={() => setIsNavlinkShown(false)}
            className="p-0"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            onClick={() => setIsNavlinkShown(false)}
            className="flex items-center gap-2 px-4 py-2 text-green-500 transition-all duration-200 hover:bg-gray-200"
          >
            <p>Upload</p>
            <PiUploadSimple className="text-xl" />
          </Link>
        </li>
        {isLoggedIn() ? (
          <Link
            className="rounded-sm border-[1px] border-gray-500 px-3 py-2 transition-all duration-200 hover:bg-gray-200"
            to="/my-profile"
          >
            My&nbsp;profile
          </Link>
        ) : (
          <li className="flex items-center">
            <Link
              className="rounded-sm bg-gray-600 px-5 py-2 text-white transition-all duration-200 hover:bg-gray-700"
              to="/auth"
            >
              Log&nbsp;in
            </Link>
          </li>
        )}
      </ul>

      <Toaster />
    </nav>
  );
};

export default Navbar;
