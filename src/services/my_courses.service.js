const httpStatus = require('http-status');
const { MyCourse } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a myCourse // add a course to a student Mycourse
 * @param {Object} myCourseBody
 * @returns {Promise<MyCourse>}
 */
const createMyCourse = async (myCourseBody) => {
  if (await MyCourse.isExists(myCourseBody.courseId, myCourseBody.studentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists');
  }
  const myCourse = await MyCourse.create(myCourseBody);
  return myCourse;
};

/**
 * get all courses of student
 * @param {ObjectId} studentId
 * @returns {Promise<QueryResult>}
 */
const getAllMyCourseOfStudent = async (studentId) => {
  const allMyCourse = await MyCourse.find({ studentId });
  return allMyCourse;
};

/**
 * Query for myCourse
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMyCourse = async (filter, options) => {
  const resultMyCourse = await MyCourse.paginate(filter, options);
  return resultMyCourse;
};

/**
 * get my course by myCourseId
 * @param {ObjectId} id
 * @returns {Promise<MyCourse>}
 */
const getMyCourseById = async (id) => {
  return MyCourse.findById(id);
};

/**
 * delete my course by id
 * @param {ObjectId} myCourseId
 * @returns {Promise<MyCourse>}
 */
const deleteMyCourseById = async (myCourseId) => {
  const myCourse = await getMyCourseById(myCourseId);
  if (!myCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'my course not found');
  }
  await myCourse.remove();
  return myCourse;
};

module.exports = {
  createMyCourse,
  getAllMyCourseOfStudent,
  getMyCourseById,
  queryMyCourse,
  deleteMyCourseById,
};
