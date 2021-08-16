const httpStatus = require('http-status');
const { Course, SubCategory, User } = require('../models');
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
 * Get all courses in system
 * @returns {Promise<QueryResult>}
 */
const getAllCourses = async () => {
  const courses = await Course.find()
    .populate({ path: 'subCategory', select: 'name' })
    .populate({ path: 'teacher', select: 'name' });
  return courses;
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
const queryCourses = async (query, filter, options) => {
  // eslint-disable-next-line no-param-reassign
  options.populate = 'teacher, subCategory';
  if (query) {
    const subCategories = await SubCategory.find({ $text: { $search: `"${query}"` } });
    let orArray = [{ $text: { $search: `"${query}"` } }];
    subCategories.forEach((subCategory) => {
      orArray = [...orArray, { subCategoryId: subCategory.id }];
    });

    // eslint-disable-next-line no-param-reassign
    filter.$or = [...orArray];
  }
  const courses = await Course.paginate(filter, options);
  return courses;
};

/**
 * Get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
  return Course.findById(id)
    .populate({ path: 'subCategory', select: 'name categoryId' })
    .populate({ path: 'teacher', select: 'name email avatar shortDescription' });
};

/**
 * get course by subCategoryId
 * @param {ObjectId} subCategoryId
 * @returns {Promise<QueryResult>}
 */
const getCoursesBySubCategoryId = async (subCategoryId) => {
  const courses = Course.find({ subCategoryId });
  return courses;
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

/**
 * Get course details by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseDetailsById = (id) => {
  const populateObj = {
    path: 'sections',
    options: { sort: { ordinalNumber: 1 } },
    populate: {
      path: 'lectures',
      options: { sort: { ordinalNumber: 1 } },
      populate: {
        path: 'video',
        select: 'videoUrl',
      },
    },
  };
  return Course.findById(id).populate(populateObj);
};

/**
 * update rating and rating count
 *  @param {ObjectId} courseId
 *  @param {Number} score
 *  @returns {Promise<Course>}
 */
const updateRatingAndRatingCount = async (courseId, score) => {
  const course = await getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'course not found');
  }
  let newRating = (course.rating * course.ratingCount + score) / (course.ratingCount + 1);
  newRating = Math.round((newRating + Number.EPSILON) * 10) / 10;
  const newRatingCount = course.ratingCount + 1;
  Object.assign(course, { rating: newRating, ratingCount: newRatingCount });
  await course.save();
  return course;
};

/**
 * delete all courses by user id if user is teacher
 * @param {ObjectId} userId
 */
const deleteCoursesByUserId = async (userId) => {
  const user = await User.findById(userId);
  if (user && user.role === 'teacher') {
    const courses = await Course.find({ teacherId: userId });
    await Promise.all(
      courses.map(async (course) => {
        return await deleteCourseById(course.id);
      })
    );
  }
};

module.exports = {
  getCourseById,
  getAllCourses,
  queryCourses,
  createCourse,
  deleteCourseById,
  updateCourseById,
  getCoursesBySubCategoryId,
  increaseViewByCourseId,
  increaseSubscriberNumberByCourseId,
  updateRatingAndRatingCount,
  getCourseDetailsById,
  deleteCoursesByUserId,
};
