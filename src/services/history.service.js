const httpStatus = require('http-status');
const { History } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * get History by id
 * @param {ObjectId} id
 * @returns {Promise<History>}
 */
const getHistoryById = async (id) => {
  return History.findById(id);
};

/**
 * create a history
 * @param {Object} body
 * @returns {Promise<Lecture>}
 */
const createHistory = async (body) => {
  if (await History.isExists(body.myCourseId, body.lectureId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists');
  }
  const lecture = await History.create(body);
  return lecture;
};

/**
 * get all history of myCourseId
 * @param {ObjectId} myCourseId
 * @returns {Promise<QueryResult>}
 */
const getAllHistoryOfMyCourseId = async (myCourseId) => {
  const allHistory = await History.find({ myCourseId });
  return allHistory;
};

/**
 * update history by id
 * @param {ObjectId} historyId
 * @param {object} updateBody
 * @returns {Promise<SubCategory>}
 */
const updateHistoryById = async (historyId, updateBody) => {
  const history = await getHistoryById(historyId);
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  Object.assign(history, updateBody);
  await history.save();
  return history;
};

module.exports = {
  getHistoryById,
  createHistory,
  getAllHistoryOfMyCourseId,
  updateHistoryById,
};
