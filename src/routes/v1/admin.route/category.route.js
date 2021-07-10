const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const categoryValidation = require('../../../validations/category.validation');
const categoryController = require('../../../controllers/category.controller');
const subCategoryValidation = require('../../../validations/sub_category.validation');
const subCategoryController = require('../../../controllers/sub_category.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCategories'), validate(categoryValidation.createCategory), categoryController.createCategory) // thêm category
  .get(categoryController.getCategories); // query search category

router
  .route('/:categoryId')
  .get(validate(categoryValidation.getCategory), categoryController.getCategory) // xem chi tiết category
  .patch(auth('manageCategories'), validate(categoryValidation.updateCategory), categoryController.updateCategory) // update category
  .delete(auth('manageCategories'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory); // xóa category

router
  .route('/:categoryId/subCategories')
  .get(validate(subCategoryValidation.getSubCategoriesByCategoryId), subCategoryController.getSubCategoriesByCategoryId); // get all sub categories in this category
module.exports = router;
