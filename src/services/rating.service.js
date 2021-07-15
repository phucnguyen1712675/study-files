// const httpStatus = require('http-status');
const { Ratings } = require('../models');
// const ApiError = require('../utils/ApiError');

/**
 * create a rating
 * @param {Object} ratingBody
 * @returns {Promise<Rating>}
 */
const createRating = async (ratingBody) => {
  const rating = await Ratings.create(ratingBody);
  return rating;
};

/**
 * Query for ratings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRatings = async (filter, options) => {
  const ratings = await Ratings.paginate(filter, options);
  return ratings;
};

/**
 * Get rating by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getRatingById = async (id) => {
  return Ratings.findById(id);
};

/**
 * increase view in rating by ratingId
 * @param {ObjectId} ratingId
 * @returns {Promise<Course>}
 */
/* const increaseViewByCourseId = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'course not found');
  }
  const newView = course.view + 1;
  Object.assign(course, { view: newView });
  await course.save();
  return course;
}; */

/**
 * increase subscriberNumber in course by courseId
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
/* const increaseSubscriberNumberByCourseId = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'course not found');
  }
  const newSubscriberNumber = course.subscriberNumber + 1;
  Object.assign(course, { subscriberNumber: newSubscriberNumber });
  await course.save();
  return course;
}; */

module.exports = {
  getRatingById,
  queryRatings,
  createRating,
};
