import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ImageGrid from "../components/ImageGrid";

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"

          // TabIndicatorProps={{
          //   style: {
          //     backgroundColor: "#936639",
          //   },
          // }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              label={category.name}
              value={category.value}
            />
          ))}
        </Tabs>
      </Box>

      {/* Created a new component that displays image in grid. Displays image according to the value i.e. category */}
      <ImageGrid category={value} />
    </div>
  );
};

export default Home;
