import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getImages } from "../services/apiImages";
import Skeleton from "@mui/material/Skeleton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ImageGrid = () => {
  const { categoryName } = useParams();

  const query = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    staleTime: 0, // so that images are refetched. Otherwise catched data was shown before
  });

  if (query.isLoading) {
    return (
      <div className="mx-auto mt-5 grid w-2/3 grid-cols-3 gap-4">
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

  return (
    <ImageList
      className="mx-auto mt-5 md:w-4/5 lg:w-2/3"
      variant="masonry"
      cols={3}
      gap={8}
    >
      {query.data.map((item) => (
        <ImageListItem key={item.imageUrl}>
          <img
            srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
            // alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGrid;
