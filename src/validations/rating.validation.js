const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRating = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    studentId: Joi.string().required(),
    courseId: Joi.string().required(),
    content: Joi.string().required(),
    score: Joi.number().integer().required(),
  }),
};

const getRatings = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRating,
  getRatings,
};
