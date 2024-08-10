const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  getAllImages,
  getImageById,
  deleteImage,
  updateImage,
  createImage,
  addFavourite,
  getUserFavourites,
  removeUserFavourite,
  getImageByCategory,
  getUserUploads,
  getImageSearch,
} = require("../controllers/image");

/*
  This route is in beginning because when I kept it after (router.get("/:imageId", getImageById);), 
  then it put "favourite" in place of imageID and tried to fetch image by ID and we got an error
*/
router.get("/user/uploads", authMiddleware, getUserUploads);
router.get("/favourite", authMiddleware, getUserFavourites);

router.get("/", getAllImages);
router.get("/category/:category", getImageByCategory);
router.get("/search", getImageSearch);
router.get("/:imageId", getImageById);
router.post("/", authMiddleware, createImage);
router.delete("/:imageId", deleteImage);
router.patch("/:imageId", updateImage);

router.post("/favourite/:imageId", authMiddleware, addFavourite);
router.delete("/favourite/:imageId", authMiddleware, removeUserFavourite);

module.exports = router;
