const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const subCategoryValidation = require('../../../validations/sub_category.validation');
const subCategoryController = require('../../../controllers/sub_category.controller');

const router = express.Router();
router
  .route('/')
  .post(auth('manageCategories'), validate(subCategoryValidation.createSubCategory), subCategoryController.createSubCategory) // create sub category
  .get(auth('manageCategories'), validate(subCategoryValidation.getSubCategories), subCategoryController.getSubCategories); // query sub categories

router
  .route('/:subCategoryId')
  .get(auth('manageCategories'), validate(subCategoryValidation.getSubCategory), subCategoryController.getSubCategory) // get sub category
  .patch(
    auth('manageCategories'),
    validate(subCategoryValidation.updateSubCategory),
    subCategoryController.updateSubCategory
  ) // update sub category
  .delete(
    auth('manageCategories'),
    validate(subCategoryValidation.deleteSubCategory),
    subCategoryController.deleteSubCategory
  ); // delete sub category

module.exports = router;
