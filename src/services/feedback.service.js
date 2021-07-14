// const httpStatus = require('http-status');
const { Feedbacks } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * create a feedback
 * @param {Object}feedbackBody
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (feedbackBody) => {
  const feedback = await Feedbacks.create(feedbackBody);
  return feedback;
};

/**
 * Query for feedback
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFeedbacks = async (filter, options) => {
  const feedbacks = await Feedbacks.paginate(filter, options);
  return feedbacks;
};

/**
 * Get feedback by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getFeedbackById = async (id) => {
  return Feedbacks.findById(id);
};

module.exports = {
  getFeedbackById,
  queryFeedbacks,
  createFeedback,
};
