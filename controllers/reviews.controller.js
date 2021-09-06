const { Review } = require("../models/review.model");
const { Book } = require("../models/book.model");

exports.get = async (req, res) => {
  const reviews = await Review.find({}).sort("-createdOn").populate("user", "-password -email");
  if (!reviews) return res.status(404).send("There are no reviews at the moment.");

  res.send(reviews);
};

exports.create = async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) return res.status(400).send("Invalid book.");

  const foundReview = await Review.findOne({ user: req.user._id, book: bookId });
  if (foundReview) return res.status(400).send("One user can only have one review per book.");

  const review = await new Review({ ...req.body, book: bookId, user: req.user._id });
  review.save();

  book.reviews.push(review);

  res.send(review);
};

// exports.update = async (req, res) => {
//   const { book } = req.body;
//   const { id } = req.params;

//   const customer = await Customer.findOne({ user: req.user._id });
//   if (!customer) return res.status(400).send("Customer not created. Create a customer profile to rent a book.");

//   const foundBook = await Book.findById(book);
//   if (!foundBook) return res.status(400).send("Invalid book.");

//   if (!foundBook.isAvailable) return res.status(400).send("Book not in stock.");

//   const rental = await Rental.findByIdAndUpdate(id, { ...req.body, customer: customer._id, book }, { new: true });

//   res.send(rental);
// };

// exports.delete = async (req, res) => {
//   const { id } = req.params;

//   const rental = await Rental.findByIdAndDelete(id);
//   if (!rental) return res.status(404).send("The rental with the given ID was not found.");

//   res.send(rental);
// };

// exports.getSingle = async (req, res) => {
//   const { id } = req.params;
//   const rental = await Rental.findById(id).populate("customer").populate("book");

//   if (!rental) return res.status(404).send("The rental with the given ID was not found.");

//   res.send(rental);
// };
