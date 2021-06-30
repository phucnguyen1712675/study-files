const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser) // create new user /teacher
  .get(auth('manageUsers'), validate(userValidation.getUsers), userController.getUsers); // query search user //teacher

router
  .route('/:userId')
  .get(auth('getUser'), validate(userValidation.getUser), userController.getUser) // get user //teacher
  .patch(auth('manageUsers'), validate(userValidation.updateUserByAdmin), userController.updateUser) // update user /teacher
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser); // delete user /teacher

module.exports = router;
