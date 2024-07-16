const express = require("express");
const router = express.Router();

const {
  getAllImages,
  getImageById,
  deleteImage,
  updateImage,
  createImage,
} = require("../controllers/image");

router.get("/", getAllImages);
router.get("/:imageId", getImageById);
router.post("/", createImage);
router.delete("/:imageId", deleteImage);
router.patch("/:imageId", updateImage);

module.exports = router;
