const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { lastLectureWatchedService } = require('../services');

const createLastLectureWatched = catchAsync(async (req, res) => {
  const lastLecture = await lastLectureWatchedService.createLastLectureWatched(req.body);
  res.status(httpStatus.CREATED).send(lastLecture);
});

const getLastLectureWatched = catchAsync(async (req, res) => {
  const result = await lastLectureWatchedService.getLastLectureWatchedOfMyCourseId(req.params.myCourseId);
  res.send(result);
});

const updateLastLectureWatched = catchAsync(async (req, res) => {
  const lastLecture = await lastLectureWatchedService.updateLastLectureWatchedById(
    req.params.lastLectureWatchedId,
    req.body
  );
  res.send(lastLecture);
});

module.exports = {
  createLastLectureWatched,
  getLastLectureWatched,
  updateLastLectureWatched,
};
