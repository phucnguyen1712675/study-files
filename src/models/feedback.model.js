const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const feedbackSchema = mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
      trim: true,
    },
    ratingId: {
      type: String,
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
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

feedbackSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef  Feedbacks
 */
const Feedbacks = mongoose.model('feedbacks', feedbackSchema, 'feedbacks');

module.exports = Feedbacks;
