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

  var newLecture;

  if (!req.body.video) {
    newLecture = {
      ...req.body,
      canPreview: false,
    };
  } else {
    const { video } = req.body;

    const { secure_url } = await cloudinary.uploader.upload_large(video, {
      resource_type: 'video',
      upload_preset: COURSE_VIDEOS_UPLOAD_PRESET,
    });

    newLecture = {
      ...req.body,
      videoUrl: secure_url,
    };
  }
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

const updateLecture = catchAsync(async (req, res) => {
  var newBody;

  if (!req.body.video) {
    newBody = { ...req.body };
  } else {
    const { video } = req.body;

    const { secure_url } = await cloudinary.uploader.upload_large(video, {
      resource_type: 'video',
      upload_preset: COURSE_VIDEOS_UPLOAD_PRESET,
    });

    newBody = {
      ...req.body,
      videoUrl: secure_url,
    };
  }

  const lecture = await lectureService.updateLectureById(req.params.lectureId, newBody);
  res.send(lecture);
});

const swapLectureOrdinalNumber = catchAsync(async (req, res) => {
  const { firstLectureId, secondLectureId } = req.body;

  const firstLecture = await lectureService.getLectureById(firstLectureId);

  const secondLecture = await lectureService.getLectureById(secondLectureId);

  if (firstLecture.sectionId !== secondLecture.sectionId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Lectures not in the same section');
  }

  const firstOrdinalNumber = secondLecture.ordinalNumber;

  const secondOrdinalNumber = firstLecture.ordinalNumber;

  const firstUpdateBody = {
    ordinalNumber: firstOrdinalNumber,
  };

  const secondUpdateBody = {
    ordinalNumber: secondOrdinalNumber,
  };

  const firstLectureRes = await lectureService.updateLectureById(firstLectureId, firstUpdateBody);

  const secondLectureRes = await lectureService.updateLectureById(secondLectureId, secondUpdateBody);

  res.send([firstLectureRes, secondLectureRes]);
});

module.exports = {
  createLecture,
  getLectures,
  testCreateLecture,
  updateLecture,
  swapLectureOrdinalNumber,
};
