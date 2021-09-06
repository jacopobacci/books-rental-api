const { Book } = require("../models/book.model");
const { Genre } = require("../models/genre.model");

exports.get = async (req, res) => {
  const books = await Book.find().sort("title").populate("genre").populate("user").exec();

  if (!books.length) return res.status(404).send("There aren't book anymore, add a new one!");

  res.send(books);
};

exports.create = async (req, res) => {
  const { genre } = req.body;

  const foundGenre = await Genre.findOne({ name: genre });
  if (!foundGenre) return res.status(400).send("Invalid genre.");

  const book = await new Book(req.body);
  book.genre = foundGenre._id;
  book.user = req.user._id;
  console.log(book.user);
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

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("genre").populate("user").exec();

  if (!book) return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
};
