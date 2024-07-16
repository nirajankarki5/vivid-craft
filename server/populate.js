// Run this file to populate our database with the image list data

require("dotenv").config();
const connectDB = require("./db/connect");

const Image = require("./models/Image");

const jsonImages = require("./data");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Image.deleteMany();
    await Image.create(jsonImages);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
