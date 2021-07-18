const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const watchListValidation = require('../../../validations/watch_list.validation');
const watchListController = require('../../../controllers/watch_list.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageWatchList'), validate(watchListValidation.createWatchList), watchListController.createWatchList);

router
  .route('/:studentId')
  .get(
    auth('manageWatchList'),
    validate(watchListValidation.getAllWatchListOfStudent),
    watchListController.getAllWatchListOfStudent
  );

router
  .route('/:watchListId')
  .delete(auth('manageWatchList'), validate(watchListValidation.deleteWatchList), watchListController.deleteWatchList);

module.exports = router;
