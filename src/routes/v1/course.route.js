const express = require('express');
const validate = require('../../middlewares/validate');
const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course.controller');

const router = express.Router();

// TODO Add auth('addCourse')
router.post('/', validate(courseValidation.createCourse), courseController.createCourse);

router.get('/', validate(courseValidation.getCourses), courseController.getCourses);

router.get('/:courseId', validate(courseValidation.getCourse), courseController.getCourse);

router.patch('/:courseId', validate(courseValidation.updateCourse), courseController.updateCourse);

router.delete('/:courseId', validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;
