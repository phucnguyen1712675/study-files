const { Lecture } = require('../models');

/**
 * create a lecture
 * @param {Object} body
 * @returns {Promise<Lecture>}
 */
const createLecture = async (body) => {
  const { sectionId } = body;

  const lectureCount = await Lecture.countDocuments({ sectionId }).exec();

  const newLecture = {
    ...body,
    ordinalNumber: lectureCount,
  };

  const lecture = await Lecture.create(newLecture);
  return lecture;
};

/**
 * Query for lectures
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLectures = async (filter, options) => {
  // options.populate = 'lectures';
  const lectures = await Lecture.paginate(filter, options);
  return lectures;
};

module.exports = {
  createLecture,
  queryLectures,
};
