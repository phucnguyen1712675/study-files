const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lectureSchema = mongoose.Schema(
  {
    sectionId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 70,
    },
    ordinalNumber: {
      type: Number,
      required: true,
      min: 0,
    },
    canPreview: {
      type: Boolean,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

lectureSchema.set('toObject', { virtuals: true });
lectureSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
lectureSchema.plugin(toJSON);
lectureSchema.plugin(paginate);

/**
 * Check if OrdinalNumber is taken
 * @param {string} name - The lecture's OrdinalNumber
 * @param {ObjectId} [excludeCourseId] - The id of the lecture to be excluded
 * @returns {Promise<boolean>}
 */
lectureSchema.statics.isOrdinalNumberTaken = async function (ordinalNumber, excludeCourseId) {
  const lecture = await this.findOne({ ordinalNumber, _id: { $ne: excludeCourseId } });
  return !!lecture;
};

/**
 * @typedef Lecture
 */
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
