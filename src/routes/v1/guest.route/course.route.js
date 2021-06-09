const express = require('express');
const validate = require('../../../middlewares/validate');
const courseValidation = require('../../../validations/course.validation');
const courseController = require('../../../controllers/course.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(courseValidation.createCourse), courseController.createCourse)
  .get(validate(courseValidation.getCourses), courseController.getCourses);

router.route('/:courseId').get(validate(courseValidation.getCourse), courseController.getCourse);

module.exports = router;
