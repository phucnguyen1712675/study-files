const express = require('express');
const validate = require('../../../middlewares/validate');
const { sectionValidation, lectureValidation } = require('../../../validations');
const { courseController, sectionController, lectureController } = require('../../../controllers');

const router = express.Router();
router.route('/sections/').post(validate(sectionValidation.createSection), sectionController.createSection);
router.route('/lectures').post(validate(lectureValidation.testCreateLecture), lectureController.testCreateLecture);
router.route('/courses').get(courseController.getAllCourses);

module.exports = router;
