if (process.env.NODE_ENV !== "production") require("dotenv").config();

require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const error = require("./middleware/error");
const users = require("./routes/users.route");
const auth = require("./routes/auth.route");
const config = require("config");
const books = require("./routes/books.route");
const genres = require("./routes/genres.route");

const app = express();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use(error);

const db = config.get("db");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${db}`))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
