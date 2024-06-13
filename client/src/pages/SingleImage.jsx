import React from "react";
import { useParams } from "react-router-dom";

const SingleImage = () => {
  const { imageId } = useParams();

  return <div className="mt-[5rem]">{imageId}</div>;
};

export default SingleImage;
