import React, { useState } from "react";
import ImageGrid from "../components/ImageGrid";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("all");

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-[5rem] sm:mt-20">
      <div className="no-scrollbar flex gap-5 overflow-x-scroll border-b-[1px] p-2 px-4 sm:px-8">
        {categories.map((category) => (
          <NavLink
            key={category.value}
            to={`/c/${category.value}`}
            style={({ isActive }) => ({
              color: isActive ? "blue" : "#777",
              borderBottom: isActive && "blue",
            })}
            className="text-nowrap font-normal  uppercase"
          >
            {category.name}
          </NavLink>
        ))}
      </div>

      {/* Created a new component that displays image in grid. Displays image according to the value i.e. category */}
      <ImageGrid />
    </div>
  );
};

export default Home;
