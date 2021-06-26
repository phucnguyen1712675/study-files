const express = require('express');
const validate = require('../../../middlewares/validate');
const subCategoryValidation = require('../../../validations/sub_category.validation');
const subCategoryController = require('../../../controllers/sub_category.controller');

const router = express.Router();

router.route('/').get(validate(subCategoryValidation.getSubCategories), subCategoryController.getSubCategories); // query subCategory
module.exports = router;
