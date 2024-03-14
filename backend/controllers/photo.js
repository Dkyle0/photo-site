const Photo = require("../models/Photo");
const fs = require("fs").promises;

async function addPhoto(photo) {
  const newPhoto = await Photo.create(photo);
  // await newPhoto.populate({
  //   populate: "author",
  // });
  return newPhoto;
}

async function getPhotos(type = "", limit = 6, page = 1) {
  const [photos, count] = await Promise.all([
    Photo.find({ type })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Photo.countDocuments({ type }),
  ]);

  await Promise.all(
    photos.map(async (photo) => {
      try {
        const imageData = await fs.readFile(photo.path);
        const base64Image = imageData.toString("base64");
        photo.imageData = base64Image;
      } catch (error) {
        console.error(
          `Ошибка чтения файла для фотографии ${photo._id}: ${error}`
        );
      }
    })
  );

  return {
    photos,
    lastPage: Math.ceil(count / limit),
  };
}

async function deletePhoto(id) {
  try {
    const photo = await Photo.findById(id);
    if (!photo) {
      throw new Error("Photo not found");
    }

    await fs.unlink(photo.path);
  } catch (error) {
    console.error(error);
  }

  return Photo.deleteOne({ _id: id });
}

async function addLike(photoId, { add, author }) {
  if (add) {
    await Photo.findByIdAndUpdate(photoId, { $push: { likes: author } });
  } else {
    await Photo.findByIdAndUpdate(photoId, { $pull: { likes: author } });
  }
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
  getPhotos,
  deletePhoto,
  addLike,
};
