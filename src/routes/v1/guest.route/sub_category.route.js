const express = require('express');
const subCategoryController = require('../../../controllers/sub_category.controller');

const router = express.Router();

router.route('/').get(subCategoryController.getSubCategories); // query subCategory
module.exports = router;
