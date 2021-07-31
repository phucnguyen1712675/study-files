const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLecture = {
  body: Joi.object().keys({
    sectionId: Joi.custom(objectId).required(),
    title: Joi.string().min(10).max(70).required(),
    canPreview: Joi.boolean(),
    video: Joi.string(),
  }),
};

const getLectures = {
  query: Joi.object().keys({
    title: Joi.string(),
    sectionId: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createLecture,
  getLectures,
};
