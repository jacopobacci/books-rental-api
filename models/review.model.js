const Joi = require("joi");
const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  )
);

function validateReview(review) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    author: Joi.objectId().required(),
  });

  return schema.validate(review);
}

exports.review = Review;
exports.validate = validateReview;
