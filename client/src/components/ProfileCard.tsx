import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getUserById } from "../services/apiUser";
import { Skeleton } from "@mui/material";

interface Prop {
  userId: string | undefined;
}

const ProfileCard: React.FC<Prop> = ({ userId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton variant="circular" width={55} height={55} />
        <div>
          <Skeleton width={65} height={15} />
          <Skeleton width={30} height={15} />
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`${data?.username === "Anonymous" ? "#" : `/user/${data?.username}`}`}
      className="group flex items-center gap-2"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
        <FaRegUser className="mx-auto text-2xl text-gray-400" />
        {/* <img src="" alt="" /> */}
      </div>
      <div>
        <h2 className="font-semibold leading-4 group-hover:underline group-hover:underline-offset-2">
          {data?.username}
        </h2>
        <p className="text-sm text-gray-400">follow</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
