import { useParams } from "react-router-dom";

type RouteParams = {
  imageId: string;
  [key: string]: string | undefined;
};

const SingleImage = () => {
  const { imageId } = useParams<RouteParams>();

  return <div className="mt-[5rem]">{imageId}</div>;
};

export default SingleImage;
