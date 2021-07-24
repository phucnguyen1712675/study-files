const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 20,
      maxlength: 60,
    },
    subCategoryId: {
      type: String,
      required: true,
      trim: true,
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
      minlength: 100,
      maxlength: 300,
    },
    detailDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 1000,
      maxlength: 2000,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
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
      min: 0,
    },
    view: {
      type: Number,
      default: 0,
      min: 0,
    },
    raring: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    originalFee: {
      type: Number,
      default: 0,
      min: 0,
      max: 500,
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
