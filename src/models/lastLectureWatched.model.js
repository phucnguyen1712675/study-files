const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lastLectureWatchedSchema = mongoose.Schema(
  {
    historyId: {
      type: String,
      required: true,
      trim: true,
    },
    myCourseId: {
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
lastLectureWatchedSchema.plugin(toJSON);
lastLectureWatchedSchema.plugin(paginate);

/**
 * check if myCourseId  is taken
 * @param {String} myCourseId
 * @param {ObjectId} [excludeId]
 * @returns {Promise<boolean>}
 */
lastLectureWatchedSchema.statics.isExists = async function (myCourseId, excludeId) {
  const lastLectureWatched = await this.findOne({ myCourseId, _id: { $ne: excludeId } });
  return !!lastLectureWatched;
};

/**
 * @typedef Section
 */
const LastLectureWatched = mongoose.model('lastLectureWatched', lastLectureWatchedSchema, 'lastLectureWatched');

module.exports = LastLectureWatched;
