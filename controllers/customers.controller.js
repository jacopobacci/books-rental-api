const { Customer } = require("../models/customer.model");
const { Genre } = require("../models/genre.model");

exports.get = async (req, res) => {
  const customers = await Customer.find()
    .sort("firstName")
    .populate("user", "-password -isAdmin")
    .populate("favouriteGenres")
    .exec();

  if (!customers.length) return res.status(404).send("There aren't customers, create a new one!");

  res.send(customers);
};

exports.create = async (req, res) => {
  const foundCustomer = await Customer.findOne({ user: req.user._id });
  if (foundCustomer) return res.status(400).send("Customer already exists for this user.");

  const { favouriteGenres } = req.body;
  let genreIds = [];

  for (let genre of favouriteGenres) {
    const foundGenre = await Genre.findOne({ name: genre });
    if (!foundGenre) return res.status(400).send("Invalid genre.");

    genreIds.push(foundGenre._id);
  }

  const customer = await new Customer(req.body);
  customer.favouriteGenres = genreIds;
  customer.user = req.user._id;
  await customer.save();

  res.send(customer);
};

// exports.update = async (req, res) => {
//   const { id } = req.params;

//   const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
//   if (!book) return res.status(404).send("The book with the given ID was not found.");

//   res.send(book);
// };

// exports.delete = async (req, res) => {
//   const { id } = req.params;

//   const book = await Book.findByIdAndDelete(id);
//   if (!book) return res.status(404).send("The book with the given ID was not found.");

//   res.send(book);
// };

// exports.getSingle = async (req, res) => {
//   const { id } = req.params;
//   const book = await Book.findById(id).populate("genre").populate("user").exec();

//   if (!book) return res.status(404).send("The book with the given ID was not found.");

//   res.send(book);
// };
