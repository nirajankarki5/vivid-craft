// this route is for uploading images to S3 bucket
// it generates a presigned URL that client can use to upload to s3

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getPresignedUrl } = require("../controllers/upload");

router.get("/upload", authMiddleware, getPresignedUrl);

module.exports = router;
