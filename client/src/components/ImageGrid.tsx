import React from "react";

import { Link } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery } from "@mui/material";

import ImageList from "@mui/material/ImageList";
import Image from "../types/Image";

interface Prop {
  imageList: Image[] | undefined;
}

const ImageGrid: React.FC<Prop> = ({ imageList }) => {
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

  return (
    <ImageList
      className="mx-auto mt-5 animate-fadein opacity-0 md:w-4/5 lg:w-2/3 xl:w-5/6 2xl:w-[1400px]"
      style={{ animationFillMode: "forwards" }}
      variant="masonry"
      cols={cols}
      gap={8}
    >
      {imageList.map((item) => (
        <Link to={`/image/${item._id}`} key={item._id}>
          <ImageListItem>
            <img
              srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              // alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );

  // return <h1 className="h-screen">{categoryName}</h1>;
};

export default ImageGrid;
