const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { courseValidation } = require('../../../validations');
const { courseController } = require('../../../controllers');

const router = express.Router();

router.route('/').post(auth('manageCourses'), validate(courseValidation.createCourse), courseController.createCourse);
router.route('/:courseId').patch(auth('manageCourses'), validate(courseValidation.updateCourse), courseController.updateCourse);

module.exports = router;
