const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subCategoryId: {
      type: String,
      // index: true,
      required: true,
      trim: true,
    },
    teacherId: {
      type: String,
      required: true,
      trim: true,
    },
    subscriberNumber: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    originalFee: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    promotionStart: {
      type: Date,
    },
    promotionEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
courseSchema.index({ name: 'text' });

courseSchema.virtual('subCategory', {
  ref: 'subCategories',
  localField: 'subCategoryId',
  foreignField: '_id',
  justOne: true,
});

courseSchema.virtual('teacher', {
  ref: 'User',
  localField: 'teacherId',
  foreignField: '_id',
  justOne: true,
});

courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });

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
const Course = mongoose.model('courses', courseSchema, 'courses');

module.exports = Course;
