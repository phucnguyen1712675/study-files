const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWatchList = {
  body: Joi.object().keys({
    courseId: Joi.string().required(),
    studentId: Joi.string().required(),
  }),
};

const getAllWatchListOfStudent = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getAllWatchList = {
  query: Joi.object().keys({
    courseId: Joi.string(),
    studentId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWatchList = {
  params: Joi.object().keys({
    watchListId: Joi.string().custom(objectId),
  }),
};

const deleteWatchList = {
  params: Joi.object().keys({
    watchListId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createWatchList,
  getAllWatchList,
  getAllWatchListOfStudent,
  getWatchList,
  deleteWatchList,
};
