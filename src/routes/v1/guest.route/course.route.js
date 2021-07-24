const express = require('express');
const validate = require('../../../middlewares/validate');
const { courseValidation } = require('../../../validations');
const { courseController } = require('../../../controllers');

const router = express.Router();

router.route('/').get(validate(courseValidation.getCourses), courseController.getCourses);

router.route('/:courseId').get(validate(courseValidation.getCourse), courseController.getCourse);

router.route('/:courseId/details').get(validate(courseValidation.getCourse), courseController.getCourseDetails);

module.exports = router;
