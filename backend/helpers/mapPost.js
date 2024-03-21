const mongoose = require("mongoose");

module.exports = function (post) {
  return {
    id: post.id,
    title: post.title,
    imageUrl: post.image,
    content: post.content,
    publishedAt: post.createdAt,
  };
};
