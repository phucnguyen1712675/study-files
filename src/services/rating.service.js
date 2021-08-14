const httpStatus = require('http-status');
const { Ratings, User, Course } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a rating
 * @param {Object} ratingBody
 * @returns {Promise<Rating>}
 */
const createRating = async (ratingBody) => {
  if (!(await User.findById(ratingBody.studentId))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!(await Course.findById(ratingBody.courseId))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  if (await Ratings.isRated(ratingBody.studentId, ratingBody.courseId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have rated this course');
  }
  const rating = await Ratings.create(ratingBody);
  const result = await Ratings.findById(rating.id).populate({
    path: 'student',
    select: 'name',
  });
  return result;
};

/**
 * getRatings
 * @param {ObjectId} courseId
 * @returns {Promise<QueryResult>}
 */
const getRatings = async (courseId) => {
  const ratings = await Ratings.find({ courseId }).populate({
    path: 'student',
    select: 'name',
  });
  return ratings;
};

module.exports = {
  createRating,
  getRatings,
};
