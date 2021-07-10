const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subCategoryService, courseService } = require('../services');

const createSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.createSubCategory(req.body);
  res.status(httpStatus.CREATED).send(subCategory);
});

const getSubCategories = catchAsync(async (req, res) => {
  const result = await subCategoryService.querySubCategories();
  res.send(result);
});

const getSubCategoriesByCategoryId = catchAsync(async (req, res) => {
  const result = await subCategoryService.getSubCategoriesByCategoryId(req.params.categoryId);
  res.send(result);
});

const getSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.getSubCategoryById(req.params.subCategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'subCategory not found');
  }
  res.send(subCategory);
});

const updateSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.updateSubCategoryById(req.params.subCategoryId, req.body);
  res.send(subCategory);
});

const increaseSubcriberNumberSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subCategoryService.increaseSubcriberNumberSubCategory(req.params.subCategoryId);
  res.send(subCategory);
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const courses = await courseService.getCoursesBySubCategoryId(req.params.subCategoryId);
  if (courses.length !== 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'cannot delete because of exists courses');
  }
  await subCategoryService.deleteSubCategoryById(req.params.subCategoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoriesByCategoryId,
  getSubCategory,
  updateSubCategory,
  increaseSubcriberNumberSubCategory,
  deleteSubCategory,
};
