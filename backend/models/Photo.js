const mongoose = require("mongoose");

const validTypes = ["landscape", "street", "portrait"];

const PhotoSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      dafault: [],
    },
    type: {
      type: String,
      required: true,
      enum: validTypes,
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
