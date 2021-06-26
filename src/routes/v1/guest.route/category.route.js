const express = require('express');
const validate = require('../../../middlewares/validate');
const categoryValidation = require('../../../validations/category.validation');
const categroyController = require('../../../controllers/category.controller');
const subCategoryValidation = require('../../../validations/sub_category.validation');
const subCategoryController = require('../../../controllers/sub_category.controller');

const router = express.Router();

// category
router.route('/').get(validate(categoryValidation.getCategories), categroyController.getCategories);
router
  .route('/:categoryId/subCategories')
  .get(validate(subCategoryValidation.getSubCategoriesByCategoryId), subCategoryController.getSubCategoriesByCategoryId); // get subcategory by categoryId
module.exports = router;
