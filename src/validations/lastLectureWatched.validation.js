const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLastLectureWatched = {
  body: Joi.object().keys({
    historyId: Joi.custom(objectId).required(),
    myCourseId: Joi.custom(objectId).required(),
  }),
};

const getLastLectureWatched = {
  params: Joi.object().keys({
    myCourseId: Joi.custom(objectId),
  }),
};

const updateLastLectureWatched = {
  params: Joi.object().keys({
    lastLectureWatchedId: Joi.required().custom(objectId),
    myCourseId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    historyId: Joi.custom(objectId).required(),
    myCourseId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createLastLectureWatched,
  getLastLectureWatched,
  updateLastLectureWatched,
};
