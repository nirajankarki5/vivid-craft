const express = require("express");
const router = express.Router();

const { getAllImages, getImageById } = require("../controllers/image");

router.get("/", getAllImages);
router.get("/:imageId", getImageById);

module.exports = router;
