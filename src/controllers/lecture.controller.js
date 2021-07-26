const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lectureService, sectionService } = require('../services');
const { COURSE_VIDEOS_UPLOAD_PRESET } = require('../constants/cloudinary');
const { cloudinary } = require('../utils/cloudinary');

const createLecture = catchAsync(async (req, res) => {
  const { sectionId } = req.body;

  const section = await sectionService.getSectionById(sectionId);
  if (!section) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section not found');
  }

  const { video } = req.body;

  const { url } = await cloudinary.uploader.upload_large(video, {
    resource_type: 'video',
    upload_preset: COURSE_VIDEOS_UPLOAD_PRESET,
  });

  const newLecture = {
    ...req.body,
    videoUrl: url,
  };

  const lecture = await lectureService.createLecture(newLecture);
  res.status(httpStatus.CREATED).send(lecture);
});

const getLectures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'sectionId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await lectureService.queryLectures(filter, options);
  res.send(result);
});

const testCreateLecture = catchAsync(async (req, res) => {
  const { sectionId } = req.body;

  const section = await sectionService.getSectionById(sectionId);
  if (!section) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section not found');
  }
  const lecture = await lectureService.createLecture(req.body);
  res.status(httpStatus.CREATED).send(lecture);
});

module.exports = {
  createLecture,
  getLectures,
  testCreateLecture,
};
