const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedbackService } = require('../services');

const createFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send(feedback);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'subCategoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await feedbackService.queryFeedbacks(filter, options);
  res.send(result);
});

const getFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.getFeedbackById(req.params.feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  res.send(feedback);
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
};
