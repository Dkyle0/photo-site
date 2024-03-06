const Photo = require("../models/Photo");

async function addPhoto(photo) {
  const newPhoto = await Photo.create(photo);
  // await newPhoto.populate({
  //   populate: "author",
  // });
  return newPhoto;
}

// async function editPost(id, post) {
//   const newPost = await Post.findByIdAndUpdate(id, post, {
//     returnDocument: "after",
//   });

//   await newPost.populate({
//     path: "comments",
//     populate: "author",
//   });

//   return newPost;
// }

// function deletePost(id) {
//   return Post.deleteOne({ _id: id });
// }

// function getPost(id) {
//   return Post.findById(id).populate({
//     path: "comments",
//     populate: "author",
//   });
// }

// async function getPosts(search = "", limit = 7, page = 1) {
//   const [posts, count] = await Promise.all([
//     Post.find({ title: { $regex: search, $options: "i" } })
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 }),
//     Post.countDocuments({ title: { $regex: search, $options: "i" } }),
//   ]);

//   return {
//     posts,
//     lastPage: Math.ceil(count / limit),
//   };
// }

module.exports = {
  addPhoto,
};
