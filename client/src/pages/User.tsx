import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../services/apiUser";
import Loading from "../components/Loading";
import Error from "./Error";
import ImageGrid from "../components/ImageGrid";

interface RouteParams {
  username: string;
  [key: string]: string | undefined;
}

const User: React.FC = () => {
  const { username } = useParams<RouteParams>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username),
  });

  if (isLoading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="mx-auto grid justify-center gap-1 md:w-[45rem] md:grid-cols-2 md:justify-center">
        <aside className="mb-1 mt-4 flex h-36 items-center justify-center md:mb-4 md:mt-8 md:h-44 lg:h-56">
          <div className="flex h-full w-36 items-center justify-center rounded-full bg-gray-200 md:w-44 lg:w-56">
            <FaRegUser className="mx-auto text-5xl text-gray-400" />
            {/* <img src="" alt="" /> */}
          </div>
        </aside>

        <section className="mb-5 mt-2 text-center md:my-auto md:text-left">
          <p className="text-md mb-1 font-semibold text-gray-800 md:text-2xl">
            @{data?.username}
          </p>
          <p>{data?.email}</p>

          <p className="w-80 py-2 text-center text-sm text-gray-400 md:w-auto md:pt-5 md:text-left md:text-base">
            Get gorgeous, high-quality pictures that{" "}
            <strong>{data?.username}</strong> have handpicked for free.
          </p>
        </section>
      </div>

      <div>
        <h1 className="mx-8 mb-2 mt-4 text-2xl font-semibold">Uploads</h1>
        <p className="mx-8 border-b-[1px] border-gray-200"></p>
      </div>

      <ImageGrid imageList={data?.uploads} />
    </>
  );
};

export default User;
