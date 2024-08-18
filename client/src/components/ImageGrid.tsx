import React from "react";

import { Link, useLocation } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery } from "@mui/material";

import ImageList from "@mui/material/ImageList";
import Image from "../types/Image";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartDislike } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

import useAddToFav from "../hooks/useAddToFav";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "../services/apiImages";

interface Prop {
  imageList: Image[] | undefined;
  tab?: string;
}

const ImageGrid: React.FC<Prop> = ({ imageList, tab }) => {
  const { mutation } = useAddToFav();
  const location = useLocation();
  const queryClient = useQueryClient();

  const deleteImgMutation = useMutation({
    mutationFn: (imageId: string) => deleteImage(imageId),
    onSuccess: () => {
      toast.success("Image successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  // make resposive image grid
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:769px) and (max-width:1024px)",
  );
  const isLargeScreen = useMediaQuery("(min-width:1025px)");

  let cols;
  if (isSmallScreen) {
    cols = 1;
  } else if (isMediumScreen) {
    cols = 2;
  } else if (isLargeScreen) {
    cols = 3;
  }

  if (imageList === undefined) {
    return <p className="text-xl text-gray-400">There are no images</p>;
  }

  if (imageList.length === 0) {
    return (
      <h1 className="mt-20 text-center text-2xl text-gray-400">
        There are no images
      </h1>
    );
  }

  const handleAddToFav = (imageId: string) => {
    console.log(location.pathname);
    if (location.pathname === "/my-profile") {
      return mutation.mutate({ method: "DELETE", imageId: imageId });
    }

    mutation.mutate({ method: "POST", imageId: imageId });
  };

  return (
    <>
      <ImageList
        className="mx-auto mt-5 animate-fadein opacity-0 md:w-4/5 lg:w-2/3 xl:w-5/6 2xl:w-[1400px]"
        style={{ animationFillMode: "forwards" }}
        variant="masonry"
        cols={cols}
        gap={8}
      >
        {imageList.map((item) => (
          <ImageListItem
            key={item._id}
            className="group relative overflow-hidden"
          >
            <Link to={`/image/${item._id}`} key={item._id}>
              <img
                srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                // alt={item.title}
                loading="lazy"
              />

              {/* Overlay (Dark on over) */}
              {/* Here, group-hover means when hovering to group (group is className in ImageListItem) */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out md:group-hover:opacity-30"></div>
            </Link>

            <div className="bottom-0 left-0 z-50 flex w-full transform items-center justify-between px-4 py-3 shadow-sm transition-all duration-300 ease-in-out md:absolute md:translate-y-full md:shadow-none md:group-hover:translate-y-0">
              {/* when upload tab is not selected in my-profile, display HEART ICON */}
              {tab !== "uploads" && (
                <button
                  onClick={() => handleAddToFav(item._id)}
                  className="flex items-center gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 px-2"
                >
                  {location.pathname === "/my-profile" && tab === "likes" ? (
                    <IoMdHeartDislike className="text-xl text-gray-400" />
                  ) : (
                    <FaHeart className="text-xl text-gray-400" />
                  )}
                  <span>{item.favouritesCount}</span>
                </button>
              )}

              {/* When upload tab is selected in my-profile, display delete icon */}
              {tab === "uploads" && (
                <button
                  onClick={() => deleteImgMutation.mutate(item._id)}
                  className="flex items-center gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 px-2"
                >
                  <RiDeleteBinLine className="text-xl text-red-500" />
                </button>
              )}

              <button
                onClick={() => saveAs(item.imageUrl, `image-${item._id}.jpg`)}
                className="rounded-md border-[1px] border-gray-400 bg-white p-2 px-3 text-sm text-gray-500"
              >
                Download
              </button>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <Toaster />
    </>
  );

  // return <h1 className="h-screen">{categoryName}</h1>;
};

export default ImageGrid;
