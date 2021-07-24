const express = require('express');
const validate = require('../../../middlewares/validate');
const userValidation = require('../../../validations/user.validation');
const userController = require('../../../controllers/user.controller');

const router = express.Router();

router.route('/:userId').get(validate(userValidation.getUser), userController.getUser);

module.exports = router;
