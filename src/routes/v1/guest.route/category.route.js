const express = require('express');
const validate = require('../../../middlewares/validate');
const { categoryValidation } = require('../../../validations');
const { categoryController } = require('../../../controllers');

const router = express.Router();

router.route('/').get(validate(categoryValidation.getCategories), categoryController.getCategories);

router.route('/:categoryId').get(validate(categoryValidation.getCategory), categoryController.getCategory);

module.exports = router;
