const { Rental } = require("../models/rental.model");
const { Customer } = require("../models/customer.model");
const { Book } = require("../models/book.model");

exports.get = async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut").populate("customer").populate("book");
  if (!rentals) return res.status(404).send("There are no rental at the moment.");

  res.send(rentals);
};

exports.create = async (req, res) => {
  const { book } = req.body;

  const customer = await Customer.findOne({ user: req.user._id });
  if (!customer) return res.status(400).send("Customer not created. Create a customer profile to rent a book.");

  const foundBook = await Book.findById(book);
  if (!foundBook) return res.status(400).send("Invalid book.");

  if (!foundBook.isAvailable) return res.status(400).send("Book not in stock.");

  const rental = await new Rental({ customer: customer._id, book });
  rental.save();

  res.send(rental);
};

// exports.update = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
//   if (!genre) return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// };

// exports.delete = async (req, res) => {
//   const { id } = req.params;

//   const genre = await Genre.findByIdAndDelete(id);
//   if (!genre) return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// };

// exports.getSingle = async (req, res) => {
//   const { id } = req.params;
//   const genre = await Genre.findById(id);

//   if (!genre) return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// };
