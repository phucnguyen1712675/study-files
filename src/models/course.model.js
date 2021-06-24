const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subCategoryId: {
      type: String,
      required: true,
      trim: true,
    },
    detailDescription: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    subscriberNumber: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
      min: 0,
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The course's name
 * @param {ObjectId} [excludeCourseId] - The id of the course to be excluded
 * @returns {Promise<boolean>}
 */
courseSchema.statics.isNameTaken = async function (name, excludeCourseId) {
  const course = await this.findOne({ name, _id: { $ne: excludeCourseId } });
  return !!course;
};

courseSchema.pre('save', async function (next) {
  next();
});

// TODO trang nhớ fix
/**
 * @typedef Course
 */
 const Course = mongoose.model('Course', courseSchema);


module.exports = Course;
