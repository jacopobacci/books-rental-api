const Joi = require("joi");
const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  })
);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    image: Joi.string().required(),
    genre: Joi.objectId().required(),
    description: Joi.string().min(5).max(1024).required(),
    isAvailable: Joi.boolean(),
  });

  return schema.validate(book);
}

exports.book = Book;
exports.validate = validateBook;
