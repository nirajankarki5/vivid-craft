import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getSearchImages } from "../services/apiImages";
import Loading from "../components/Loading";
import Error from "./Error";
import ImageGrid from "../components/ImageGrid";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");

  const query = useQuery({
    queryKey: ["images", tag],
    queryFn: () => getSearchImages(tag),
  });

  if (query.isLoading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }

  if (query.error) {
    return <Error />;
  }

  return (
    <>
      <h1 className="p-5 text-xl">
        Search results for <span className="font-semibold">"{tag}"</span>
      </h1>
      <ImageGrid imageList={query.data} />;
    </>
  );
};

export default Search;
