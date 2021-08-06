const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { sectionConstant } = require('../constants');

const sectionSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: sectionConstant.SECTION_NAME_MIN_LENGTH,
      maxlength: sectionConstant.SECTION_NAME_MAX_LENGTH,
    },
    ordinalNumber: {
      type: Number,
      required: true,
      min: sectionConstant.SECTION_ORDINAL_NUMBER_MIN_VALUE,
    },
  },
  {
    timestamps: true,
  }
);

sectionSchema.virtual('lectures', {
  ref: 'Lecture',
  localField: '_id',
  foreignField: 'sectionId',
});

sectionSchema.set('toObject', { virtuals: true });
sectionSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
sectionSchema.plugin(toJSON);
sectionSchema.plugin(paginate);

/**
 * Check if OrdinalNumber is taken
 * @param {string} name - The section's OrdinalNumber
 * @param {ObjectId} [excludeSectionId] - The id of the section to be excluded
 * @returns {Promise<boolean>}
 */
sectionSchema.statics.isOrdinalNumberTaken = async function (ordinalNumber, excludeSectionId) {
  const section = await this.findOne({ ordinalNumber, _id: { $ne: excludeSectionId } });
  return !!section;
};

/**
 * Check if section is belong to course
 * @param {string} courseId - The course's id
 * @param {ObjectId} [excludeSectionId] - The id of the course to be excluded
 * @returns {Promise<boolean>}
 */
sectionSchema.statics.isBelongToCourse = async function (courseId, excludeSectionId) {
  const section = await this.findOne({ courseId, _id: { $ne: excludeSectionId } });
  return !!section;
};

/**
 * @typedef Section
 */
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
