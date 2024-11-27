const Photo = require("../models/Photo");
const fs = require("fs").promises;

async function addPhoto(photo) {
  const newPhoto = await Photo.create(photo);

  return newPhoto;
}

async function getPhotoData(photos) {
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
}

async function getLikedPhotos(id, limit = 6, page = 1) {
  try {
    const photos = await Photo.find({ likes: id })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Photo.countDocuments({ likes: id });

    await getPhotoData(photos);

    return {
      photos,
      lastPage: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Ошибка при получении фотографий:", error);
    throw error;
  }
}

async function getPhotos(type = "", limit = 6, page = 1) {
  const [photos, count] = await Promise.all([
    Photo.find({ type })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Photo.countDocuments({ type }),
  ]);

  await getPhotoData(photos);

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

module.exports = {
  addPhoto,
  getPhotos,
  getLikedPhotos,
  deletePhoto,
  addLike,
};
