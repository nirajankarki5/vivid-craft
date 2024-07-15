import { useParams } from "react-router-dom";

interface RouteParams {
  imageId: string;
  [key: string]: string | undefined;
}

const SingleImage: React.FC = () => {
  const { imageId } = useParams<RouteParams>();

  return <div className="mt-[5rem]">{imageId}</div>;
};

export default SingleImage;
