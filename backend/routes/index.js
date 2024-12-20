const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/personal", require("./personal"));
router.use("/posts", require("./post"));
router.use("/users", require("./user"));
router.use("/portfolio", require("./portfolio"));

module.exports = router;
