import React, { useState } from "react";
import categories from "../utils/categories";

const Upload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[1].name); // Initial selection
  const [tags, setTags] = useState<string>("");

  const filteredCategories = categories.filter(
    (category) => category.value !== "all",
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(image, selectedCategory, tags);
  };

  return (
    <>
      <h1 className="pt-4 text-center text-3xl font-medium text-gray-400">
        Upload Image
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-5 mt-10 md:mx-auto md:w-2/3 lg:w-[800px]"
      >
        <input
          className="text-sm file:mr-5 file:cursor-pointer file:rounded-md file:bg-primary-color file:px-4 file:py-3 file:text-white file:shadow-none"
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          placeholder="Select an Image"
        />

        <label className="mb-1 mt-6 block">Select image category</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {filteredCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="mb-1 mt-6 block">
          Tags
          <span className="text-xs text-gray-400">
            &nbsp; (They help in better image search)
          </span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
          placeholder="mountain, river..."
        ></textarea>

        <div className="flex w-full justify-center">
          <button
            className="mt-5 rounded-md bg-green-700 px-9 py-3 text-white hover:bg-green-800"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Upload;
