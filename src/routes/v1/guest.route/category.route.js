const express = require('express');
const validate = require('../../../middlewares/validate');
const {categoryController, subCategoryController} = require('../../../controllers');
const {subCategoryValidation} = require('../../../validations');

const router = express.Router();

// category
router.route('/').get(categoryController.getCategories);

router
  .route('/:categoryId/subCategories')
  .get(validate(subCategoryValidation.getSubCategoriesByCategoryId), subCategoryController.getSubCategoriesByCategoryId); // get subcategory by categoryId

module.exports = router;
