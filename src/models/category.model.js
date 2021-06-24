const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The cate's name
 * @param {ObjectId} [excludeCategoryId] - The id of the cate to be excluded
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
  return !!category;
};

categorySchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('categories', categorySchema, 'categories');

module.exports = Category;
