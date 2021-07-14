const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRating = {
  body: Joi.object().keys({
    studentId: Joi.string().required(),
    courseId: Joi.string().required(),
    content: Joi.string().required(),
    score: Joi.number().integer().required(),
  }),
};

const getRatings = {
  query: Joi.object().keys({
    studentId: Joi.string(),
    courseId: Joi.string(),
    content: Joi.string(),
    score: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRating = {
  params: Joi.object().keys({
    ratingId: Joi.string().custom(objectId),
  }),
};

const updateRating = {
  params: Joi.object().keys({
    ratingId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().required(),
    })
    .min(1),
};

const deleteRating = {
  params: Joi.object().keys({
    ratingId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRating,
  getRating,
  getRatings,
  updateRating,
  deleteRating,
};
