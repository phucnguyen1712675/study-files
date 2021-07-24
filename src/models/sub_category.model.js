const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subscriberNumber: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

subCategorySchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

subCategorySchema.set('toObject', { virtuals: true });
subCategorySchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
subCategorySchema.plugin(toJSON);
subCategorySchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The subCategory's name
 * @param {ObjectId} [excludeSubCategoryId] - The id of the subCategory to be excluded
 * @returns {Promise<boolean>}
 */
subCategorySchema.statics.isNameTaken = async function (name, excludeSubCategoryId) {
  const subCategory = await this.findOne({ name, _id: { $ne: excludeSubCategoryId } });
  return !!subCategory;
};

// subCategorySchema.pre('save', async function (next) {
//   next();
// });

/**
 * @typedef SubCategory
 */
const SubCategory = mongoose.model('subCategories', subCategorySchema, 'subCategories');

module.exports = SubCategory;
