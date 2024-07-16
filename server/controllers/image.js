const CustomAPIError = require("../errors/custom-error");
const Image = require("../models/Image");

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

  const user = await User.findById(userId);
  user.favourites.push(imageId);
  await user.save();

  const image = await Image.findById(imageId);
  image.favouritesCount += 1;
  await image.save();

  res.status(200).json(user);
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  deleteImage,
  updateImage,
};
