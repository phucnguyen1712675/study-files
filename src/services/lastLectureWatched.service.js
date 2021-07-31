const httpStatus = require('http-status');
const { lastLectureWatched } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * get History by id
 * @param {ObjectId} id
 * @returns {Promise<History>}
 */
const getLastLectureWatchedById = async (id) => {
  return lastLectureWatched.findById(id);
};

/**
 * create a lastLectureWatched
 * @param {Object} body
 * @returns {Promise<lastLectureWatched>}
 */
const createLastLectureWatched = async (body) => {
  if (await lastLectureWatched.isExists(body.myCourseId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists');
  }
  const lecture = await lastLectureWatched.create(body);
  return lecture;
};

/**
 * get lastLectureWatched of myCourseId
 * @param {ObjectId} myCourseId
 * @returns {Promise<lastLectureWatched>}
 */
const getLastLectureWatchedOfMyCourseId = async (myCourseId) => {
  console.log(myCourseId);
  const lastLecture = await lastLectureWatched.findOne({ myCourseId });
  return lastLecture;
};

/**
 * update lastLectureWatched by id
 * @param {ObjectId} lastId
 * @param {object} updateBody
 * @returns {Promise<lastLectureWatched>}
 */
const updateLastLectureWatchedById = async (lastId, updateBody) => {
  const lastLecture = await getLastLectureWatchedById(lastId);
  if (!lastLecture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'lastLecture not found');
  }
  Object.assign(lastLecture, updateBody);
  await lastLecture.save();
  return lastLecture;
};

module.exports = {
  getLastLectureWatchedById,
  createLastLectureWatched,
  getLastLectureWatchedOfMyCourseId,
  updateLastLectureWatchedById,
};
