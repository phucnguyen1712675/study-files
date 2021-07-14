const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ratingSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ratingSchema.plugin(toJSON);
ratingSchema.plugin(paginate);

ratingSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Ratings
 */
const Ratings = mongoose.model('ratings', ratingSchema, 'ratings');

module.exports = Ratings;
