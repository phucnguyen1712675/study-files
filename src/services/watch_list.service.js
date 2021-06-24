const httpStatus = require('http-status');
const { WatchList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a watchList // add a course to a student watchList
 * @param {Object} watchListBody
 * @returns {Promise<WatchList>}
 */
const createWatchList = async (watchListBody) => {
  if (await WatchList.isExists(watchListBody.courseId, watchListBody.studentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists');
  }
  const watchList = await WatchList.create(watchListBody);
  return watchList;
};

/**
 * get all watch list of student
 * @param {ObjectId} studentId
 * @returns {Promise<QueryResult>}
 */
const getAllWatchListOfStudent = async (studentId) => {
  const allWatchList = await WatchList.find({ studentId });
  return allWatchList;
};

/**
 * Query for watchList
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWatchList = async (filter, options) => {
  const resultWatchList = await WatchList.paginate(filter, options);
  return resultWatchList;
};

/**
 * get watch list by watchListId
 * @param {ObjectId} id
 * @returns {Promise<WatchList>}
 */
const getWatchListById = async (id) => {
  return WatchList.findById(id);
};

/**
 * delete watch list by id
 * @param {ObjectId} watchListId
 * @returns {Promise<WatchList>}
 */
const deleteWatchListById = async (watchListId) => {
  const watchList = await getWatchListById(watchListId);
  if (!watchList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'watch list not found');
  }
  await watchList.remove();
  return watchList;
};

module.exports = {
  createWatchList,
  getAllWatchListOfStudent,
  getWatchListById,
  queryWatchList,
  deleteWatchListById,
};
