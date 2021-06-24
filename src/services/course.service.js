const httpStatus = require('http-status');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
  if (await Course.isNameTaken(courseBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const course = await Course.create(courseBody);
  return course;
};

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourses = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
  return Course.findById(id);
};

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

/**
 * increase view in course by courseId
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
const increaseViewByCourseId = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'course not found');
  }
  const newView = course.view + 1;
  Object.assign(course, { view: newView });
  await course.save();
  return course;
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  await course.remove();
  return course;
};

/**
 * increase subscriberNumber in course by courseId
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 */
const increaseSubscriberNumberByCourseId = async (courseId) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'course not found');
  }
  const newSubscriberNumber = course.subscriberNumber + 1;
  Object.assign(course, { subscriberNumber: newSubscriberNumber });
  await course.save();
  return course;
};

module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  increaseViewByCourseId,
  increaseSubscriberNumberByCourseId,
};
