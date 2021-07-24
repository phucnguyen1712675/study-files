const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { feedbackService } = require('../services');

const createFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send(feedback);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await feedbackService.getFeedBacks(courseId);
  res.send(result);
});

module.exports = {
  createFeedback,
  getFeedbacks,
};
