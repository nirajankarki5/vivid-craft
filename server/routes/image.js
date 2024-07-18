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
} = require("../controllers/image");

/*
  This route is in beginning because when I kept it after (router.get("/:imageId", getImageById);), 
  then it put "favourite" in place of imageID and tried to fetch image by ID and we got an error
*/
router.get("/favourite", authMiddleware, getUserFavourites);

router.get("/", getAllImages);
router.get("/:imageId", getImageById);
router.post("/", createImage);
router.delete("/:imageId", deleteImage);
router.patch("/:imageId", updateImage);

router.post("/favourite/:imageId", authMiddleware, addFavourite);
router.delete("/favourite/:imageId", authMiddleware, removeUserFavourite);

module.exports = router;
