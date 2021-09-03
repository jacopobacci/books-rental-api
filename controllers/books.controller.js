const { Book } = require("../models/book.model");
const { Genre } = require("../models/genre.model");

exports.create = async (req, res) => {
  const { title, author, image, genreName, description } = req.body;

  const genre = await Genre.findOne({ name: genreName });
  if (!genre) return res.status(400).send("Invalid genre.");

  const book = new Book({
    title,
    author,
    image,
    genre: genre._id,
    description,
  });
  book.user = req.user._id;
  await book.save();

  res.send(book);
};

exports.update = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!book) return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);
  if (!book) return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
};
