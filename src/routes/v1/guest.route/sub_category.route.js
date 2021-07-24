const express = require('express');
const validate = require('../../../middlewares/validate');
const { subCategoryValidation } = require('../../../validations');
const { subCategoryController } = require('../../../controllers');

const router = express.Router();

router.route('/').get(validate(subCategoryValidation.getSubCategories), subCategoryController.getSubCategories);

module.exports = router;
