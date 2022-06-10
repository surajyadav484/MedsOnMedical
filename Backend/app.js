if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const addressRoutes = require("./routes/address");

const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use(shopRoutes);
app.use("/users", addressRoutes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.yizdy.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log(`Server started at port ${process.env.PORT}`);
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
