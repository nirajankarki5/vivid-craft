const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getPresignedUrl = async (req, res) => {
  // Assuming the client sends the file type as a query parameter (...?filetype=jpeg)
  const fileType = req.query.fileType ? req.query.fileType : "jpeg";
  const key = `${req.user.id}/${uuidv4()}.${fileType}`;

  // Get the MIME type based on the file extension
  const contentType = mime.lookup(fileType);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  res.send({ key, url });
};

module.exports = { getPresignedUrl };
