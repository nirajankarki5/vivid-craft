const CustomAPIError = require("../errors/custom-error");
const mongoose = require("mongoose");
const Image = require("../models/Image");
const User = require("../models/User");

const getAllImages = async (req, res) => {
  const images = await Image.find({});
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
  const image = await Image.create(req.body);
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

const getUserFavourites = async (req, res) => {
  console.log("HELLOOOOOOOOOOOOOOOOOO");
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

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  deleteImage,
  updateImage,
  addFavourite,
  getUserFavourites,
};
