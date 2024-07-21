import React, { useState } from "react";
import { categoryNames } from "../utils/categories";
import {
  createImage,
  getPresignedUrl,
  uploadImage,
} from "../services/apiImages";
import { getToken } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface CreateImageArgs {
  image: {
    imageUrl: string;
    category: string;
    tags: string[];
  };
  token: string | null;
}

const Upload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0); // to clear file once submitted
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[1]); // Initial selection
  const [tags, setTags] = useState<string>("");

  const filteredCategories = categoryNames.filter(
    (category) => category !== "All",
  );

  const mutation = useMutation({
    mutationFn: ({ image, token }: CreateImageArgs) =>
      createImage(image, token),
    onSuccess: () => {
      setImage(null);
      setInputKey((prevKey) => prevKey + 1);
      setTags("");
      setSelectedCategory(categoryNames[1]);
      toast.success("Image added successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const token = getToken();
    // 1. GET presigned URL
    const uploadData = await getPresignedUrl(token);
    // 2. UPLOAD image in that URL
    await uploadImage(uploadData.url, image);
    // 3. Send request to server
    const data: CreateImageArgs = {
      image: {
        imageUrl: `https://vivid-craft-bucket.s3.us-east-2.amazonaws.com/${uploadData.key}`,
        category: selectedCategory,
        tags: tagsArray,
      },
      token: token,
    };
    await mutation.mutate(data);
  };

  return (
    <>
      <h1 className="pt-10 text-center text-3xl font-medium text-gray-400">
        Upload Image
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-5 mt-10 md:mx-auto md:w-2/3 lg:w-[800px]"
      >
        <input
          className="text-sm file:mr-5 file:cursor-pointer file:rounded-md file:bg-primary-color file:px-4 file:py-3 file:text-white file:shadow-none"
          type="file"
          required={true}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          placeholder="Select an Image"
          key={inputKey}
        />

        <label className="mb-1 mt-6 block">Select image category</label>
        <select
          id="category"
          name="category"
          required={true}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {filteredCategories.map((category) => (
            <option key={category} value={category}>
              {category}
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
      <Toaster />
    </>
  );
};

export default Upload;
