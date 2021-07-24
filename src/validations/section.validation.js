const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSection = {
  body: Joi.object().keys({
    courseId: Joi.custom(objectId).required(),
    title: Joi.string().min(10).max(70).required(),
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

module.exports = {
  createSection,
  getSections,
};
