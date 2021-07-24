const httpStatus = require('http-status');
const { Feedbacks } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a feedback
 * @param {Object}feedbackBody
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (feedbackBody) => {
  if (await Feedbacks.isFeedBacked(feedbackBody.teacherId, feedbackBody.ratingId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have feedback this rating');
  }
  const feedback = await Feedbacks.create(feedbackBody);
  const result = await Feedbacks.findById(feedback.id).populate({ path: 'teacher', select: ['name', 'avatar'] });
  return result;
};

/**
 * getRatings
 * @param {ObjectId} courseId
 * @returns {Promise<QueryResult>}
 */
const getFeedBacks = async (courseId) => {
  const ratings = await Feedbacks.find({ courseId }).populate({ path: 'teacher', select: ['name', 'avatar'] });
  return ratings;
};

module.exports = {
  createFeedback,
  getFeedBacks,
};
