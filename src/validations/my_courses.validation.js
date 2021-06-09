const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMyCourses = {
  body: Joi.object().keys({
    courseId: Joi.string().required(),
    studentId: Joi.string().required(),
  }),
};

const getAllMyCoursesOfStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const getAllMyCourses = {
  query: Joi.object().keys({
    courseId: Joi.string(),
    studentId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMyCourses = {
  params: Joi.object().keys({
    myCourseId: Joi.string().custom(objectId),
  }),
};

const deleteMyCourses = {
  params: Joi.object().keys({
    myCourseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMyCourses,
  getAllMyCourses,
  getAllMyCoursesOfStudent,
  getMyCourses,
  deleteMyCourses,
};
