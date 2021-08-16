const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { myCourseValidation, historyValidation, lastLectureWatchedValidation } = require('../../../validations/index');
const { myCourseController, historyController, lastLectureWatchedController } = require('../../../controllers/index');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMyCourses'), validate(myCourseValidation.createMyCourses), myCourseController.createMycourse);

router
  .route('/:userId')
  .get(
    auth('manageMyCourses'),
    validate(myCourseValidation.getAllMyCoursesOfStudent),
    myCourseController.getAllMyCourseOfStudent
  );
router
  .route('/:myCourseId')
  .delete(auth('manageMyCourses'), validate(myCourseValidation.deleteMyCourses), myCourseController.deleteMyCourse);

// history study manage
router
  .route('/:myCourseId/histories')
  .get(auth('manageHistories'), validate(historyValidation.getHistories), historyController.getHistories)
  .post(auth('manageHistories'), validate(historyValidation.createHistory), historyController.createHistory);

router
  .route('/:myCourseId/histories/:historyId')
  .patch(auth('manageHistories'), validate(historyValidation.updateHistory), historyController.updateHistory);

// lastLectureWatched
router
  .route('/:myCourseId/lastLectureWatched')
  .get(
    auth('manageHistories'),
    validate(lastLectureWatchedValidation.getLastLectureWatched),
    lastLectureWatchedController.getLastLectureWatched
  )
  .post(
    auth('manageHistories'),
    validate(lastLectureWatchedValidation.createLastLectureWatched),
    lastLectureWatchedController.createLastLectureWatched
  );
router
  .route('/:myCourseId/lastLectureWatched/:lastLectureWatchedId')
  .patch(
    auth('manageHistories'),
    validate(lastLectureWatchedValidation.updateLastLectureWatched),
    lastLectureWatchedController.updateLastLectureWatched
  );

module.exports = router;
