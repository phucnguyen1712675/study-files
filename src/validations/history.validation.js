const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHistory = {
  body: Joi.object().keys({
    myCourseId: Joi.custom(objectId).required(),
    lectureId: Joi.custom(objectId).required(),
    endTime: Joi.number().required(),
    done: Joi.boolean().required(),
  }),
};

const getHistories = {
  params: Joi.object().keys({
    myCourseId: Joi.custom(objectId),
  }),
};

const updateHistory = {
  params: Joi.object().keys({
    historyId: Joi.required().custom(objectId),
    myCourseId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    endTime: Joi.number().required(),
    done: Joi.boolean().required(),
    myCourseId: Joi.custom(objectId),
    lectureId: Joi.custom(objectId),
  }),
};

module.exports = {
  createHistory,
  getHistories,
  updateHistory,
};
