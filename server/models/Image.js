const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Must provide user id"],
      ref: "User",
    },
    imageUrl: {
      type: String,
      required: [true, "Must provide Image Url"],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "Nature",
          "Illustration",
          "Painting",
          "Texture & Patterns",
          "Fashion & Beauty",
          "Architecture & Interiors",
          "Food & Drink",
        ],
        message: "{VALUE} is not supported",
      },
    },
    tags: {
      type: [String],
    },

    // Adding favourites count
    favouritesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
