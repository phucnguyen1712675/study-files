const httpStatus = require('http-status');
const { SubCategory, Course } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a sub category
 * @param {Object} subCategoryBody
 * @returns {Promise<SubCategory>}
 */
const createSubCategory = async (subCategoryBody) => {
  if (await SubCategory.isNameTaken(subCategoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' Name already taken');
  }
  const subCategory = await SubCategory.create(subCategoryBody);
  return subCategory;
};

/**
 * query for sub categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubCategories = async (filter, options) => {
  const subCategories = await SubCategory.paginate(filter, options);
  return subCategories;
};

/**
 * get sub category by subcategoryId
 * @param {ObjectId} id
 * @returns {Promise<SubCategory>}
 */
const getSubCategoryById = async (id) => {
  return SubCategory.findById(id);
};

/**
 * get sub category by name
 * @param {String} name
 * @return {Promise<SubCategory>}
 */
const getSubCategoryByName = async (name) => {
  return SubCategory.findOne({ name });
};

/**
 * get sub categories by categoryId
 * @param {ObjectId} categoryId
 * @returns {Promise<QueryResult>}
 */
const getSubCategoriesByCategoryId = async (categoryId) => {
  const subCategories = await SubCategory.find({ categoryId });
  return subCategories;
};

/**
 * update sub category by id
 * @param {ObjectId} subCategoryId
 * @param {object} updateBody
 * @returns {Promise<SubCategory>}
 */
const updateSubCategoryById = async (subCategoryId, updateBody) => {
  const subCategory = await getSubCategoryById(subCategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub category not found');
  }
  if (updateBody.name && (await SubCategory.isNameTaken(updateBody.name, subCategoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(subCategory, updateBody);
  await subCategory.save();
  return subCategory;
};

/**
 * increase sub category subcriberNumber
 * @param {ObjectId} subCategoryId
 * @returns {Promise<SubCategory>} result
 */
const increaseSubcriberNumberSubCategory = async (subCategoryId) => {
  const subCategory = await getSubCategoryById(subCategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub category not found');
  }
  const newSubscriberNumber = subCategory.subscriberNumber + 1;
  Object.assign(subCategory, { subscriberNumber: newSubscriberNumber });
  await subCategory.save();
  return subCategory;
};

/**
 * increase sub category subcriberNumber by courseId
 * @param {ObjectId} courseId
 * @returns {Promise<SubCategory>} result
 */
const increaseSubcriberNumberSubCategoryBycourseId = async (courseId) => {
  const course = await Course.findById(courseId);
  const { subCategoryId } = course;
  const subCategory = await getSubCategoryById(subCategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub category not found');
  }
  const newSubscriberNumber = subCategory.subscriberNumber + 1;
  Object.assign(subCategory, { subscriberNumber: newSubscriberNumber });
  await subCategory.save();
  return subCategory;
};

/**
 * delete sub category by id
 * @param {ObjectId} subCategoryId
 * @returns {Promise<SubCategory>}
 */
const deleteSubCategoryById = async (subCategoryId) => {
  const subCategory = await getSubCategoryById(subCategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub category not found');
  }
  await subCategory.remove();
  return subCategory;
};

module.exports = {
  createSubCategory,
  querySubCategories,
  getSubCategoriesByCategoryId,
  increaseSubcriberNumberSubCategory,
  increaseSubcriberNumberSubCategoryBycourseId,
  getSubCategoryById,
  getSubCategoryByName,
  deleteSubCategoryById,
  updateSubCategoryById,
};
