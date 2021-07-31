const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const historySchema = mongoose.Schema(
  {
    myCourseId: {
      type: String,
      required: true,
      trim: true,
    },
    lectureId: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
historySchema.plugin(toJSON);
historySchema.plugin(paginate);

/**
 * check if myCourseId and lectureId is taken
 * @param {String} myCourseId
 * @param {String} lectureId
 * @param {ObjectId} [excludeHistoryId]
 * @returns {Promise<boolean>}
 */
historySchema.statics.isExists = async function (myCourseId, lectureId, excludeHistoryId) {
  const history = await this.findOne({ myCourseId, lectureId, _id: { $ne: excludeHistoryId } });
  return !!history;
};

/**
 * @typedef Section
 */
const History = mongoose.model('History', historySchema);

module.exports = History;
