const express = require('express');
const validate = require('../../../middlewares/validate');
const { subCategoryValidation } = require('../../../validations');
const { subCategoryController } = require('../../../controllers');

const router = express.Router();

router.route('/').get(subCategoryController.getSubCategories); // query subCategory

router
  .route('/most-sale-sub-categories')
  .get(validate(subCategoryValidation.getMostSaleSubCategories), subCategoryController.getMostSaleSubCategories);

module.exports = router;
