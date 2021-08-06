const httpStatus = require('http-status');
const { Section } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a section
 * @param {Object} body
 * @returns {Promise<Section>}
 */
const createSection = async (body) => {
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

/**
 * Update section by id
 * @param {ObjectId} sectionId
 * @param {Object} updateBody
 * @returns {Promise<Section>}
 */
 const updateSectionById = async (sectionId, updateBody) => {
  const section = await getSectionById(sectionId);
  if (!section) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Section not found');
  }
  Object.assign(section, updateBody);
  await section.save();
  return section;
};

module.exports = {
  createSection,
  querySections,
  getSectionById,
  updateSectionById,
};
