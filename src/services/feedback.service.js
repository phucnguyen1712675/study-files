const httpStatus = require('http-status');
const { Feedbacks, User, Course } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a feedback
 * @param {Object}feedbackBody
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (feedbackBody) => {
  if (!(await User.findById(feedbackBody.teacherId))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!(await Course.findById(feedbackBody.courseId))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
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
