const express = require("express");
const {
  getPhotos,
  deletePhoto,
  addLike,
  getLikedPhotos,
} = require("../controllers/photo");
const { verify } = require("../helpers/token");
const mapPhoto = require("../helpers/mapPhoto");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const User = require("../models/User");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  if (req.query.location === "personal") {
    const tokenData = verify(req.cookies.token);

    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      res.send({ error: "Auntheficated user not found" });
      return;
    }

    const { photos, lastPage } = await getLikedPhotos(
      tokenData.id,
      req.query.limit,
      req.query.page
    );

    res.send({ data: { lastPage, photos: photos.map(mapPhoto) } });
    return;
  }

  const { photos, lastPage } = await getPhotos(
    req.query.location,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, photos: photos.map(mapPhoto) } });
});

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePhoto(req.params.id);
    res.send({ error: null });
  }
);

router.post("/:id/likes", authenticated, async (req, res) => {
  const photoId = req.params.id;
  const add = req.body.data.add;
  const author = req.body.data.authorId;

  await addLike(photoId, {
    add,
    author,
  });
  res.send({ error: null });
});

module.exports = router;
