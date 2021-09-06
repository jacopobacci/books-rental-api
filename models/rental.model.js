// const Joi = require("joi");
// const mongoose = require("mongoose");

// const rentalSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true,
//   },
// });

// const Rental = mongoose.model("Rental", rentalSchema);

// function validateRental(rental) {
//   const schema = Joi.object({
//     title: Joi.string().min(5).max(50).required(),
//     author: Joi.objectId().required(),
//   });

//   return schema.validate(rental);
// }

// exports.rental = Rental;
// exports.validate = validateRental;
