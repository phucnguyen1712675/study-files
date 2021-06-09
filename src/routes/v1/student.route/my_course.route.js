const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const myCourseValidation = require('../../../validations/my_courses.validation');
const myCourseController = require('../../../controllers/my_course.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMyCourses'), validate(myCourseValidation.createMyCourses), myCourseController.createMycourse);

router
  .route('/:studentId')
  .get(
    auth('manageMyCourses'),
    validate(myCourseValidation.getAllMyCoursesOfStudent),
    myCourseController.getAllMyCourseOfStudent
  );

module.exports = router;
