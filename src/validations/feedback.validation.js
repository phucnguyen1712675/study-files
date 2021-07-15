const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFeedback = {
  body: Joi.object().keys({
    teacherId: Joi.string().required(),
    ratingId: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getFeedbacks = {
  query: Joi.object().keys({
    teacherId: Joi.string(),
    ratingId: Joi.string(),
    content: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFeedback = {
  params: Joi.object().keys({
    feedbackId: Joi.string().custom(objectId),
  }),
};

const updateFeedback = {
  params: Joi.object().keys({
    feedbackId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().required(),
    })
    .min(1),
};

const deleteFeedback = {
  params: Joi.object().keys({
    feedbackId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFeedback,
  getFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
};
