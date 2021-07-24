const express = require('express');
const validate = require('../../../middlewares/validate');
const ratingValidation = require('../../../validations/rating.validation');
const ratingController = require('../../../controllers/rating.controller');
const auth = require('../../../middlewares/auth');

const router = express.Router();

router
  .route('/:courseId')
  .post(auth('manageRatings'), validate(ratingValidation.createRating), ratingController.createRating)
  .get(validate(ratingValidation.getRatings), ratingController.getRatings);

module.exports = router;
