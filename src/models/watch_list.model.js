const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const watchListSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
watchListSchema.plugin(toJSON);
watchListSchema.plugin(paginate);

/**
 * check if courseId and studentId is taken
 * @param {String} courseId
 * @param {String} studentId
 * @param {ObjectId} [excludeWatchListId]
 * @returns {Promise<boolean>}
 */
watchListSchema.statics.isExists = async function (courseId, studentId, excludeWatchListId) {
  const watchList = await this.findOne({ courseId, studentId, _id: { $ne: excludeWatchListId } });
  return !!watchList;
};

// watchListSchema.pre('save', async function (next) {
//   next();
// });

/**
 * @typedef WatchList
 */
const WatchList = mongoose.model('watchList', watchListSchema, 'watchList');

module.exports = WatchList;
