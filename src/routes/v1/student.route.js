const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const studentValidation = require('../../validations/student.validation');
const studentController = require('../../controllers/student.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(studentValidation.createStudent), studentController.createStudent)
  .get(auth('getUsers'), validate(studentValidation.getStudents), studentController.getStudents);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(studentValidation.getStudent), studentController.getStudent)
  .patch(auth('manageUsers'), validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(auth('manageUsers'), validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;
