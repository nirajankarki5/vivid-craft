const CustomAPIError = require("../errors/custom-error");
const mongoose = require("mongoose");
const Image = require("../models/Image");
const User = require("../models/User");

const getAllImages = async (req, res) => {
  const images = await Image.find({});
  res.status(200).json(images);
};

const getImageByCategory = async (req, res) => {
  const { category } = req.params;

  let images;

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

  if (category === "all") {
    images = await Image.find({});
  } else {
    // getting category name based on value (value comes from req.params)
    const categoryName = categories.find((item) => item.value === category);
    images = await Image.find({ category: categoryName.name });
  }

  res.status(200).json(images);
};

const getImageById = async (req, res) => {
  const { imageId } = req.params;
  const image = await Image.findOne({ _id: imageId });

  if (!image) {
    throw new CustomAPIError(`Image with id ${imageId} not found`, 404);
  }
  res.status(200).json(image);
};

const createImage = async (req, res) => {
  const image = await Image.create({ userId: req.user.id, ...req.body });
  res.status(201).json(image);
};

const deleteImage = async (req, res) => {
  const { imageId } = req.params;
  const image = await Image.findOneAndDelete({ _id: imageId });

  if (!image) {
    throw new CustomAPIError(`Image with id ${imageId} not found`, 404);
  }

  res.status(200).json(image);
};

const updateImage = async (req, res) => {
  const image = await Image.findOneAndUpdate(
    { _id: req.params.imageId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!image) {
    throw new CustomAPIError(`Image with id ${imageId} not found`, 404);
  }

  res.status(200).json(image);
};

const addFavourite = async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  // getting user and pushing that image ID in favourites array
  const user = await User.findById(userId);

  if (user.favourites.includes(imageId)) {
    throw new CustomAPIError("Image is already in favourites", 400);
  }

  user.favourites.push(mongoose.Types.ObjectId.createFromHexString(imageId)); // Ensure imageId is a valid string representation of an ObjectId
  await user.save();

  //   Incrementing favourite count by 1
  const image = await Image.findById(imageId);
  image.favouritesCount += 1;
  await image.save();

  res.status(200).json(user);
};

const getUserUploads = async (req, res) => {
  const userId = req.user.id;
  const images = await Image.find({ userId: userId });

  res.status(200).json(images);
};

const getUserFavourites = async (req, res) => {
  const userId = req.user.id;

  // Here, populate('favourites') is used to replace the image IDs in the favourites array with the actual image documents.
  // This is possible because the favourites array in the User schema contains references (ObjectIds) to documents in the Image collection.

  /*
  How populate Works
  Define References in Schema: 
    In your User schema, you define that the favourites field contains an array of ObjectIds that reference the Image model.
  Use populate Method: 
    When you query the User model and use the populate method on the favourites field, Mongoose will fetch the corresponding documents from the Image collection based on the ObjectIds stored in the favourites array.
  Replace ObjectIds with Documents: 
    The populate method then replaces the ObjectIds in the favourites array with the actual Image documents.
  */

  const user = await User.findById(userId).populate("favourites");

  res.status(200).json(user.favourites);
};

const removeUserFavourite = async (req, res) => {
  const userId = req.user.id;
  const { imageId } = req.params;

  const user = await User.findById(userId);

  // Check if the image is in the favouries array
  const imageIndex = user.favourites.indexOf(imageId);
  if (imageIndex === -1) {
    throw new CustomAPIError("Image not found in favurites", 404);
  }

  // Remove image from favourites
  user.favourites.splice(imageIndex, 1);
  await user.save();

  // Updating image's favourite count
  const image = await Image.findById(imageId);
  if (image) {
    // decrement the favouritesCount field of the Image document, ensuring that the count does not go below zero.
    image.favouritesCount = Math.max(0, image.favouritesCount - 1);
    await image.save();
  }

  res.status(200).json(user.favourites);
};

module.exports = {
  getAllImages,
  getImageByCategory,
  getImageById,
  createImage,
  deleteImage,
  updateImage,
  addFavourite,
  getUserUploads,
  getUserFavourites,
  removeUserFavourite,
};
