const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const myCoursesSchema = mongoose.Schema(
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
    created_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
myCoursesSchema.plugin(toJSON);
myCoursesSchema.plugin(paginate);

/**
 * check if courseId and studentId is taken
 * @param {String} courseId
 * @param {String} studentId
 * @param {ObjectId} [excludeMyCoursesId]
 * @returns {Promise<boolean>}
 */
myCoursesSchema.statics.isExists = async function (courseId, studentId, excludeMyCoursesId) {
  const myCourse = await this.findOne({ courseId, studentId, _id: { $ne: excludeMyCoursesId } });
  return !!myCourse;
};

/**
 * @typedef MyCourses
 */
const MyCourses = mongoose.model('myCourses', myCoursesSchema, 'myCourses');

module.exports = MyCourses;
