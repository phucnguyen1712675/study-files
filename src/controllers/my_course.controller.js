const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subCategoryService, myCourseService, courseService } = require('../services');

const createMycourse = catchAsync(async (req, res) => {
  const myCourse = await myCourseService.createMyCourse(req.body);
  subCategoryService.increaseSubcriberNumberSubCategoryBycourseId(myCourse.courseId);
  courseService.increaseSubscriberNumberByCourseId(myCourse.courseId);
  res.status(httpStatus.CREATED).send(myCourse);
});

const getAllMyCourseOfStudent = catchAsync(async (req, res) => {
  const myCourses = await myCourseService.getAllMyCourseOfStudent(req.params.studentId);
  res.send(myCourses);
});

// đề không yêu cầu
// const getMyCourses = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['courseId', 'studentId']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await myCourseService.queryMyCourse(filter, options);
//   res.send(result);
// });

const getMycourse = catchAsync(async (req, res) => {
  const myCourse = await myCourseService.getMyCourseById(req.params.myCourseId);
  if (!myCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'My Course not found');
  }
  res.send(myCourse);
});

const deleteMyCourse = catchAsync(async (req, res) => {
  await myCourseService.deleteMyCourseById(req.params.myCourseId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMycourse,
  getAllMyCourseOfStudent,
  getMycourse,
  deleteMyCourse,
};
