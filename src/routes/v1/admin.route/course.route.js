const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const courseValidation = require('../../../validations/course.validation');
const courseController = require('../../../controllers/course.controller');

const router = express.Router();

router.route('/').get(auth('manageCourses'), validate(courseValidation.getCourses), courseController.getCourses);

router
  .route('/:courseId')
  .get(auth('manageCourses'), validate(courseValidation.getCourse), courseController.getCourse)
  .delete(auth('manageCourses'), validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;
