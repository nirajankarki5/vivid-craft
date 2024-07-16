const Image = require("../models/Image");

const getAllImages = async (req, res) => {
  const images = await Image.find({});
  res.status(200).json(images);
};

module.exports = { getAllImages };
