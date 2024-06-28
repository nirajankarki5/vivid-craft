import ImageGrid from "../components/ImageGrid";
import { NavLink } from "react-router-dom";

const Home = () => {
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
      <ImageGrid />
    </>
  );
};

export default Home;
