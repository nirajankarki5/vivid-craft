const express = require("express");
const router = express.Router();

const { getAllImages } = require("../controllers/image");

router.get("/", getAllImages);

module.exports = router;
