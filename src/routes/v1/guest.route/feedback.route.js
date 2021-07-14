const express = require('express');
const validate = require('../../../middlewares/validate');
const feedbackValidation = require('../../../validations/feedback.validation');
const feedbackController = require('../../../controllers/feedback.controller');
const auth = require('../../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFeedback'), validate(feedbackValidation.createFeedback), feedbackController.createFeedback)
  .get(validate(feedbackValidation.getFeedbacks), feedbackController.getFeedbacks);

router.route('/:courseId').get(validate(feedbackValidation.getFeedback), feedbackController.getFeedback);

module.exports = router;
