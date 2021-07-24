const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFeedback = {
  body: Joi.object().keys({
    teacherId: Joi.string().required(),
    courseId: Joi.string().required(),
    ratingId: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getFeedbacks = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

// const getFeedback = {
//   params: Joi.object().keys({
//     feedbackId: Joi.string().custom(objectId),
//   }),
// };

// const updateFeedback = {
//   params: Joi.object().keys({
//     feedbackId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       content: Joi.string().required(),
//     })
//     .min(1),
// };

// const deleteFeedback = {
//   params: Joi.object().keys({
//     feedbackId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  createFeedback,
  getFeedbacks,

  // getFeedback,
  // updateFeedback,
  // deleteFeedback,
};
