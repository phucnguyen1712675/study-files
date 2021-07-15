const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ratingService } = require('../services');

const createRating = catchAsync(async (req, res) => {
  const rating = await ratingService.createRating(req.body);
  res.status(httpStatus.CREATED).send(rating);
});

const getRatings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'subCategoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ratingService.queryRatings(filter, options);
  res.send(result);
});

const getRating = catchAsync(async (req, res) => {
  const rating = await ratingService.getRatingById(req.params.ratingId);
  if (!rating) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  // ratingService.increaseViewByCourseId(req.params.courseId);
  res.send(rating);
});

module.exports = {
  createRating,
  getRatings,
  getRating,
};
