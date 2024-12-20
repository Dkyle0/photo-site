const Post = require("../models/Posts");

async function addPost(post) {
  const newPost = await Post.create(post);
  return newPost;
}

async function editPost(id, post) {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  return newPost;
}

function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

function getPost(id) {
  return Post.findById(id);
}

async function getPosts(search = "", limit = 7, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPost,
  getPosts,
};
