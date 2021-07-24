const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ratingService, courseService } = require('../services');

const createRating = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const rating = await ratingService.createRating(req.body);
  // eslint-disable-next-line no-unused-vars
  const course = await courseService.updateRatingAndRatingCount(req.body.courseId, req.body.score);
  res.status(httpStatus.CREATED).send(rating);
});

const getRatings = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await ratingService.getRatings(courseId);
  res.send(result);
});

module.exports = {
  createRating,
  getRatings,
};
