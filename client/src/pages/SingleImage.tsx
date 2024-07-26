import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { FaHeart, FaRegCalendarCheck, FaRegCircleCheck } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { RiShareForwardFill } from "react-icons/ri";

interface RouteParams {
  imageId: string;
  [key: string]: string | undefined;
}

const SingleImage: React.FC = () => {
  const { imageId } = useParams<RouteParams>();

  const tags: string[] = [
    "nature",
    "mountains",
    "river",
    "beaches",
    "nature",
    "mountains",
    "river",
    "beaches",
  ];

  return (
    <div
      className="animate-fadeinup opacity-0 md:bg-gray-800"
      style={{ animationFillMode: "forwards" }}
    >
      <div className="bg-white p-4 md:mx-10 lg:mx-20">
        <div className=" flex flex-col md:flex-row md:items-center md:justify-between">
          <ProfileCard userId="123" />

          <aside className="flex items-center justify-between gap-4 pt-3 md:pt-0">
            <button className="flex items-center gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 px-2">
              <FaHeart className="text-xl text-gray-400" />
              <span>99</span>
            </button>
            <button className="flex items-center gap-1 rounded-md bg-green-600 p-2 text-sm text-white hover:bg-green-700">
              <span>Download</span>
              <HiDownload className="text-2xl" />
            </button>
          </aside>
        </div>

        {imageId}

        <button className="flex items-center gap-1 rounded-md border-[1px] border-gray-400 bg-white p-2 text-sm text-gray-500">
          <RiShareForwardFill className="text-2xl " />
          <span>Share</span>
        </button>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div className="rounded-md bg-gray-200 p-2 text-sm">{tag}</div>
          ))}
        </div>

        {/* Description here: */}
        <ul className="mt-8 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <FaRegCalendarCheck /> <span>Published on: ...</span>
          </li>
          <li className="flex items-center gap-2">
            <FaRegCircleCheck /> <span>Free to use</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleImage;
