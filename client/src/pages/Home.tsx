import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import ImageGrid from "../components/ImageGrid";
import { NavLink, useParams } from "react-router-dom";
import { getImages } from "../services/apiImages";
import Error from "../pages/Error";

const Home: React.FC = () => {
  const { categoryName } = useParams<string>();

  const categories = [
    { name: "All", value: "all" },
    { name: "Nature", value: "nature" },
    { name: "Illustration", value: "illustration" },
    { name: "Painting", value: "painting" },
    { name: "Texture & Patterns", value: "texture-and-patterns" },
    { name: "Fashion & Beauty", value: "fashion-and-beauty" },
    { name: "Architecture & Interiors", value: "architecture-and-interiors" },
    { name: "Food & Drink", value: "food-and-drink" },
  ];

  const query = useQuery({
    queryKey: ["images"],
    queryFn: () => getImages(categoryName),
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
    <>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll border-b-[1px] px-4 pt-0 sm:px-8">
        {categories.map((category) => (
          <NavLink
            key={category.value}
            to={`/c/${category.value}`}
            style={({ isActive }) => ({
              color: isActive ? "blue" : "#777",
              borderBottom: isActive ? "2px solid blue" : undefined,
            })}
            className="block text-nowrap pb-2 font-normal uppercase"
          >
            {category.name}
          </NavLink>
        ))}
      </div>

      {/* Created a new component that displays image in grid. Displays image according to the value i.e. category */}
      <ImageGrid imageList={query.data} />
    </>
  );
};

export default Home;
