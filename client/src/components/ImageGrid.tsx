import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ImageList from "@mui/material/ImageList";
import { getImages } from "../services/apiImages";
import Error from "../pages/Error";

const ImageGrid: React.FC = () => {
  const { categoryName } = useParams();

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

  const query = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    staleTime: 0, // so that images are refetched. Otherwise catched data was shown before
  });

  console.log(query);

  if (query.isLoading) {
    return (
      <div className="mx-auto mt-5 grid grid-cols-1 gap-4 md:w-4/5 md:grid-cols-2 lg:w-2/3 lg:grid-cols-3 xl:w-5/6 2xl:w-[1400px]">
        {/* This is done in order to display 6 skeleton loading screen */}

        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            animation="wave"
            height={500}
          />
        ))}
      </div>
    );
  }

  if (query.error) {
    return <Error />;
  }

  return (
    <ImageList
      className="mx-auto mt-5 animate-fadein opacity-0 md:w-4/5 lg:w-2/3 xl:w-5/6 2xl:w-[1400px]"
      style={{ animationFillMode: "forwards" }}
      variant="masonry"
      cols={cols}
      gap={8}
    >
      {query.data ? (
        query.data.map((item) => (
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
        ))
      ) : (
        <h1 className="my-10 text-xl text-gray-400">There are no images</h1>
      )}
    </ImageList>
  );

  // return <h1 className="h-screen">{categoryName}</h1>;
};

export default ImageGrid;
