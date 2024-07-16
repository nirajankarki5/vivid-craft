const express = require("express");
const router = express.Router();

const {
  getAllImages,
  getImageById,
  deleteImage,
  updateImage,
} = require("../controllers/image");

router.get("/", getAllImages);
router.get("/:imageId", getImageById);
router.delete("/:imageId", deleteImage);
router.patch("/:imageId", updateImage);

module.exports = router;
