import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { FaHeart, FaRegCalendarCheck, FaRegCircleCheck } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { RiShareForwardFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getImageById } from "../services/apiImages";
import Loading from "../components/Loading";
import Error from "./Error";
import { Toaster } from "react-hot-toast";
import useAddToFav from "../hooks/useAddToFav";

interface RouteParams {
  imageId: string;
  [key: string]: string | undefined;
}

const SingleImage: React.FC = () => {
  const { imageId } = useParams<RouteParams>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImageById(imageId),
  });

  const { mutation } = useAddToFav();
  // const mutation = useMutation({
  //   mutationFn: () => addToFavourite({ imageId: imageId, token: getToken() }),
  //   onSuccess: () => {
  //     toast.success("Image added to favourites");
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const handleAddToFav = () => {
    mutation.mutate({ method: "POST", imageId: imageId });
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="animate-fadeinup opacity-0 md:bg-gray-900"
      style={{ animationFillMode: "forwards" }}
    >
      <div className="rounded-lg bg-white p-4 md:mx-10 lg:mx-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <ProfileCard userId={data?.userId} />

          <aside className="flex items-center justify-between gap-4 pt-3 md:pt-0">
            <button
              onClick={handleAddToFav}
              className="flex items-center gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 px-2"
            >
              <FaHeart className="text-xl text-gray-400" />
              <span>{data?.favouritesCount}</span>
            </button>
            <button className="flex items-center gap-1 rounded-md bg-green-600 p-2 text-sm text-white hover:bg-green-700">
              <span>Download</span>
              <HiDownload className="text-2xl" />
            </button>
          </aside>
        </div>

        <img
          className="mx-auto my-4 w-full object-contain md:h-[75vh]"
          src={data?.imageUrl}
          alt={data?._id}
        />

        <button className="flex items-center gap-1 rounded-md border-[1px] border-gray-400 bg-white p-2 text-sm text-gray-500">
          <RiShareForwardFill className="text-2xl " />
          <span>Share</span>
        </button>

        <div className="mt-8 flex flex-wrap gap-2">
          {data?.tags.map((tag, index) => (
            <div key={index} className="rounded-md bg-gray-200 p-2 text-sm">
              {tag}
            </div>
          ))}
        </div>

        {/* Description here: */}
        <ul className="mt-8 text-gray-400">
          <li className="flex items-center gap-2">
            <FaRegCalendarCheck />{" "}
            {data?.createdAt && (
              <span>
                Published on: {new Date(data.createdAt).toLocaleDateString()}
              </span>
            )}
          </li>
          <li className="flex items-center gap-2">
            <FaRegCircleCheck /> <span>Free to use</span>
          </li>
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleImage;
