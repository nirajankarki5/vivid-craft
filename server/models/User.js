const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Must provide email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
    },

    // Adding favourites. It is list of image ID
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  },
  { timestamps: true }
);

// pre middleware function (runs before saving the document)
UserSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

// mongoose Instance methods (DOCS)
UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = function (password) {
  const passwordIsValid = bcrypt.compareSync(password, this.password);
  return passwordIsValid;
};

module.exports = mongoose.model("User", UserSchema);
