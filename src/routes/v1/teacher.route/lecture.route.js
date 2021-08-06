const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { lectureValidation } = require('../../../validations');
const { lectureController } = require('../../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCourses'), validate(lectureValidation.createLecture), lectureController.createLecture)
  .get(auth('manageCourses'), validate(lectureValidation.getLectures), lectureController.getLectures);

router
  .route('/swap-ordinal-number')
  .patch(
    auth('manageCourses'),
    validate(lectureValidation.swapLectureOrdinalNumber),
    lectureController.swapLectureOrdinalNumber
  );

router
  .route('/:lectureId')
  .patch(auth('manageCourses'), validate(lectureValidation.updateLecture), lectureController.updateLecture);

module.exports = router;
