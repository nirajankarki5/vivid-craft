import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AuthImg from "../assets/auth_img.jpg";

const Auth = () => {
  const [isSignupVisible, setIsSignupVisible] = useState<boolean>(false);

  return (
    <div className="p-4 md:px-12 md:py-16 lg:px-20">
      <div className="grid h-[100vh] grid-rows-2 content-stretch gap-2 overflow-hidden rounded-xl shadow-md md:h-[85vh] md:grid-cols-2 md:grid-rows-1 xl:mx-auto xl:w-[1200px]">
        <div
          className="no-scrollbar relative animate-fadein overflow-scroll rounded-xl opacity-0 md:animate-fadeinup"
          style={{ animationFillMode: "forwards" }}
          // in classname, opacity is kept 0 because div appears first and then animates.
          // But it disappears after animating because of opacity-0
          // so, animationFillMode is set to forwards to prevent div from disappearing
        >
          <Login
            isSignupVisible={isSignupVisible}
            setIsSignupVisible={setIsSignupVisible}
          />
          <Signup
            isSignupVisible={isSignupVisible}
            setIsSignupVisible={setIsSignupVisible}
          />
        </div>

        <div
          className="animate-fadein rounded-xl opacity-0 md:animate-fadeindown"
          style={{ animationFillMode: "forwards" }}
        >
          <img
            className="h-full object-cover"
            src={AuthImg}
            alt="Vivid Craft"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
