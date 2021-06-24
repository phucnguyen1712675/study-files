const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategoryId: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    fee: Joi.number(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    subCategoryId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
      fee: Joi.number(),
      isCompleted: Joi.boolean(),
      view: Joi.number(),
    })
    .min(1),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
