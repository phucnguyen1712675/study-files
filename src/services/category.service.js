const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isNameTaken(categoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const category = await Category.create(categoryBody);
  return category;
};

/**
 * Query for categories
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async () => {
  const categories = await Category.find();
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

/**
 * Get category by name
 * @param {String} name
 * @returns {Promise<Category>}
 */
const getCategoryByName = async (name) => {
  return Category.findOne({ name });
};

/**
 *  Update category by id
 * @param {ObjectId} categoryId
 * @param {object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.name && (await Category.isNameTaken(updateBody.name, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

/**
 * Get categories details
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCategoriesDetails = () => {
  const populateObj = {
    path: 'subCategories',
  };
  return Category.find().populate(populateObj);
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
  deleteCategoryById,
  getCategoriesDetails,
};
