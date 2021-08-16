const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { courseConstant } = require('../constants');

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: courseConstant.COURSE_NAME_MIN_LENGTH,
      maxlength: courseConstant.COURSE_NAME_MAX_LENGTH,
    },
    subCategoryId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    teacherId: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: courseConstant.COURSE_SHORT_DESCRIPTION_MIN_LENGTH,
      maxlength: courseConstant.COURSE_SHORT_DESCRIPTION_MAX_LENGTH,
    },
    detailDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: courseConstant.COURSE_DETAIL_DESCRIPTION_MIN_LENGTH,
      maxlength: courseConstant.COURSE_DETAIL_DESCRIPTION_MAX_LENGTH,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: courseConstant.COURSE_STATUS_DEFAULT_VALUE,
    },
    fee: {
      type: Number,
      default: courseConstant.COURSE_FEE_DEFAULT_VALUE,
      min: courseConstant.COURSE_FEE_MIN_VALUE,
      max: courseConstant.COURSE_FEE_MAX_VALUE,
    },
    subscriberNumber: {
      type: Number,
      default: courseConstant.COURSE_SUBSCRIBER_NUMBER_DEFAULT_VALUE,
      min: courseConstant.COURSE_SUBSCRIBER_NUMBER_MIN_VALUE,
    },
    view: {
      type: Number,
      default: courseConstant.COURSE_VIEW_DEFAULT_VALUE,
      min: courseConstant.COURSE_VIEW_MIN_VALUE,
    },
    rating: {
      type: Number,
      default: courseConstant.COURSE_RATING_DEFAULT_VALUE,
      min: courseConstant.COURSE_RATING_MIN_VALUE,
      max: courseConstant.COURSE_RATING_MAX_VALUE,
    },
    ratingCount: {
      type: Number,
      default: courseConstant.COURSE_RATING_COUNT_DEFAULT_VALUE,
    },
    originalFee: {
      type: Number,
      default: courseConstant.COURSE_ORIGINAL_FEE_DEFAULT_VALUE,
      min: courseConstant.COURSE_ORIGINAL_FEE_MIN_VALUE,
      max: courseConstant.COURSE_ORIGINAL_FEE_MAX_VALUE,
    },
    promotionStart: {
      type: Date,
    },
    promotionEnd: {
      type: Date,
    },
    updated_at: {
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

courseSchema.virtual('sections', {
  ref: 'Section',
  localField: '_id',
  foreignField: 'courseId',
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

/**
 * Check if course is owned by teacher
 * @param {string} teacherId - The teacher's userId
 * @param {ObjectId} [excludeCourseId] - The id of the course to be excluded
 * @returns {Promise<boolean>}
 */
courseSchema.statics.isOwnedByTeacher = async function (teacherId, excludeCourseId) {
  const course = await this.findOne({ teacherId, _id: { $ne: excludeCourseId } });
  return !!course;
};

courseSchema.pre('save', async function (next) {
  this.updated_at = Date.now();
  next();
});

/**
 * @typedef Course
 */
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
