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

module.exports = { getAllImages, getImageById, deleteImage, updateImage };
