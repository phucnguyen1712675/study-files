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

const updateSection = catchAsync(async (req, res) => {
  const section = await sectionService.updateSectionById(req.params.sectionId, req.body);
  res.send(section);
});

const swapSectionOrdinalNumber = catchAsync(async (req, res) => {
  const { firstSectionId, secondSectionId } = req.body;

  const firstSection = await sectionService.getSectionById(firstSectionId);

  const secondSection = await sectionService.getSectionById(secondSectionId);

  if (firstSection.courseId !== secondSection.courseId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sections not in the same course');
  }

  const firstOrdinalNumber = secondSection.ordinalNumber;

  const secondOrdinalNumber = firstSection.ordinalNumber;

  const firstUpdateBody = {
    ordinalNumber: firstOrdinalNumber,
  };

  const secondUpdateBody = {
    ordinalNumber: secondOrdinalNumber,
  };

  const firstSectionRes = await sectionService.updateSectionById(firstSectionId, firstUpdateBody);

  const secondSectionRes = await sectionService.updateSectionById(secondSectionId, secondUpdateBody);

  res.send([firstSectionRes, secondSectionRes]);
});

module.exports = {
  createSection,
  getSections,
  getSectionsDetails,
  updateSection,
  swapSectionOrdinalNumber,
};
