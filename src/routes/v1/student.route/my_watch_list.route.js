const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const watchListValidation = require('../../../validations/watch_list.validation');
const watchListController = require('../../../controllers/watch_list.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMyCourses'), validate(watchListValidation.createWatchList), watchListController.createWatchList);

router
  .route('/:studentId')
  .get(
    auth('manageMyCourses'),
    validate(watchListValidation.getAllWatchListOfStudent),
    watchListController.getAllWatchListOfStudent
  );

module.exports = router;
