const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (photo) {
  return {
    id: photo.id,
    author: photo.author,
    likes: photo.likes,
    type: photo.type,
    createdAt: photo.createdAt,
    imageData: photo.imageData,
  };
};
