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
    created_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.virtual('student', {
  ref: 'User',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true,
});

ratingSchema.set('toObject', { virtuals: true });
ratingSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
ratingSchema.plugin(toJSON);
ratingSchema.plugin(paginate);

/**
 * Check if studentId is rated this courseId
 * @param {string} studentId - The student's id
 * @param {string} courseId - The course's id
 * @param {ObjectId} [excludeRatingId] - The id of the rating to be excluded
 * @returns {Promise<boolean>}
 */
ratingSchema.statics.isRated = async function (studentId, courseId, excludeRatingId) {
  const rating = await this.findOne({ studentId, courseId, _id: { $ne: excludeRatingId } });
  return !!rating;
};

ratingSchema.pre('save', async function (next) {
  this.created_at = Date.now();
  next();
});

/**
 * @typedef Ratings
 */
const Ratings = mongoose.model('ratings', ratingSchema, 'ratings');

module.exports = Ratings;
