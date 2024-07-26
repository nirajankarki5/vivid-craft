import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Prop {
  userId: string;
}

const ProfileCard: React.FC<Prop> = ({ userId }) => {
  return (
    <Link to={"#"} className="group flex items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
        <FaRegUser className="mx-auto text-2xl text-gray-400" />
        {/* <img src="" alt="" /> */}
      </div>
      <div>
        <h2 className="font-semibold leading-4 group-hover:underline group-hover:underline-offset-2">
          Username
        </h2>
        <p className="text-sm text-gray-400">follow</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
