const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLecture = {
  body: Joi.object().keys({
    sectionId: Joi.custom(objectId).required(),
    title: Joi.string().min(10).max(70).required(),
    canPreview: Joi.boolean().required(),
    video: Joi.string().required(),
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

const testCreateLecture = {
  body: Joi.object().keys({
    sectionId: Joi.custom(objectId).required(),
    title: Joi.string().min(10).max(70).required(),
    canPreview: Joi.boolean().required(),
    videoUrl: Joi.string().required(),
  }),
};

module.exports = {
  createLecture,
  getLectures,
  testCreateLecture,
};
