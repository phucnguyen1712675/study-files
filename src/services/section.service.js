const httpStatus = require('http-status');
const { Section } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a section
 * @param {Object} body
 * @returns {Promise<Section>}
 */
const createSection = async (body) => {
  if (await Section.isOrdinalNumberTaken(body.ordinalNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ordinal Number already taken');
  }

  const { courseId } = body;

  const sectionCount = await Section.countDocuments({ courseId }).exec();

  const newSection = {
    ...body,
    ordinalNumber: sectionCount,
  };

  const section = await Section.create(newSection);
  return section;
};

/**
 * Query for sections
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySections = async (filter, options) => {
  const sections = await Section.paginate(filter, options);
  return sections;
};

/**
 * Get section by id
 * @param {ObjectId} id
 * @returns {Promise<Section>}
 */
const getSectionById = async (id) => {
  return Section.findById(id);
};

module.exports = {
  createSection,
  querySections,
  getSectionById,
};
