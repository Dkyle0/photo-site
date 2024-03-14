const express = require("express");
const { getPhotos, deletePhoto, addLike } = require("../controllers/photo");
const mapPhoto = require("../helpers/mapPhoto");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
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

  await addLike(req.params.id, {
    add,
    author,
  });
  res.send({ error: null });
});

module.exports = router;
