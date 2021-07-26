const express = require('express');
const validate = require('../../../middlewares/validate');
const { courseValidation, sectionValidation } = require('../../../validations');
const { courseController, sectionController } = require('../../../controllers');

const router = express.Router();

router.route('/').get(validate(courseValidation.getCourses), courseController.getCourses);

router.route('/:courseId').get(validate(courseValidation.getCourse), courseController.getCourse);

router.route('/:courseId/details').get(validate(courseValidation.getCourse), courseController.getCourseDetails);

router.route('/:courseId/sections').get(validate(sectionValidation.getSections), sectionController.getSectionsDetails);

module.exports = router;
