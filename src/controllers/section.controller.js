const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sectionService, courseService } = require('../services');

const createSection = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.body.courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  const section = await sectionService.createSection(req.body);
  res.status(httpStatus.CREATED).send(section);
});

const getSections = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'courseId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sectionService.querySections(filter, options);
  res.send(result);
});

const getSectionsDetails = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'courseId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'lectures';
  const result = await sectionService.querySections(filter, options);
  res.send(result);
});

module.exports = {
  createSection,
  getSections,
  getSectionsDetails,
};
