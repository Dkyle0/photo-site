const express = require("express");
const multer = require("multer");
const path = require("path");
const { addPhoto } = require("../controllers/photo");

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    await addPhoto({
      author: "Dkyle",
      path: req.file.path,
      type: req.body.type || "portrait",
    });

    console.log(req.file);
    res.send({
      error: null,
      photo: "Файл успешно загружен " + req.file.originalname,
    });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

module.exports = router;
