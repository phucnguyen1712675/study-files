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
    courseId: {
      type: String,
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

feedbackSchema.virtual('teacher', {
  ref: 'User',
  localField: 'teacherId',
  foreignField: '_id',
  justOne: true,
});

feedbackSchema.set('toObject', { virtuals: true });
feedbackSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

/**
 * Check if teacher is feedback this rating
 * @param {string} teacherId - The teacher's id
 * @param {string} ratingId - The rating's id
 * @param {ObjectId} [excludeRatingId] - The id of the rating to be excluded
 * @returns {Promise<boolean>}
 */
feedbackSchema.statics.isFeedBacked = async function (teacherId, ratingId, excludeRatingId) {
  const feedback = await this.findOne({ teacherId, ratingId, _id: { $ne: excludeRatingId } });
  return !!feedback;
};

feedbackSchema.pre('save', async function (next) {
  this.created_at = Date.now();
  next();
});

/**
 * @typedef  Feedbacks
 */
const Feedbacks = mongoose.model('feedbacks', feedbackSchema, 'feedbacks');

module.exports = Feedbacks;
