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
 * @param {ObjectId} [excludeMycoursesId]
 * @returns {Promise<boolean>}
 */
myCoursesSchema.statics.isExists = async function (courseId, studentId, excludeMycoursesId) {
  const myCourse = await this.findOne({ courseId, studentId, _id: { $ne: excludeMycoursesId } });
  return !!myCourse;
};

myCoursesSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef MyCourses
 */
const MyCourses = mongoose.model('myCourses', myCoursesSchema, 'myCourses');

module.exports = MyCourses;
