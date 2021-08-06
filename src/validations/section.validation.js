const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { sectionConstant } = require('../constants');

const createSection = {
  body: Joi.object().keys({
    courseId: Joi.custom(objectId).required(),
    title: Joi.string().min(sectionConstant.SECTION_NAME_MIN_LENGTH).max(sectionConstant.SECTION_NAME_MAX_LENGTH).required(),
  }),
};

const getSections = {
  query: Joi.object().keys({
    title: Joi.string(),
    courseId: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateSection = {
  params: Joi.object().keys({
    sectionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(sectionConstant.SECTION_NAME_MIN_LENGTH).max(sectionConstant.SECTION_NAME_MAX_LENGTH),
      ordinalNumber: Joi.number().min(sectionConstant.SECTION_ORDINAL_NUMBER_MIN_VALUE),
    })
    .min(1),
};

const swapSectionOrdinalNumber = {
  body: Joi.object()
    .keys({
      firstSectionId: Joi.custom(objectId).required(),
      secondSectionId: Joi.custom(objectId).required(),
    })
    .min(2),
};

module.exports = {
  createSection,
  getSections,
  updateSection,
  swapSectionOrdinalNumber,
};
