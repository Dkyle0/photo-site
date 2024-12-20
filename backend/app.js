require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.static("../frontend/build"));
app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server has beem started on port ${PORT}`);
  });
});
