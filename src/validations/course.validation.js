const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategoryId: Joi.required().custom(objectId),
    teacherId: Joi.required().custom(objectId),
    shortDescription: Joi.string().min(100).max(300).required(),
    detailDescription: Joi.string().min(1000).max(2000).required(),
    image: Joi.string().required(),
    status: Joi.boolean(),
    fee: Joi.number().min(0).max(500),
    originalFee: Joi.number().min(0).max(500),
    promotionStart: Joi.date(),
    promotionEnd: Joi.date(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    query: Joi.string(),
    name: Joi.string(),
    subCategoryId: Joi.custom(objectId),
    teacherId: Joi.custom(objectId),
    createdAt: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourse = {
  params: Joi.object().keys({
    courseId: Joi.custom(objectId),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    courseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      subCategoryId: Joi.custom(objectId),
      shortDescription: Joi.string().min(100).max(300),
      detailDescription: Joi.string().min(1000).max(2000),
      image: Joi.string(),
      status: Joi.boolean(),
      fee: Joi.number().min(0).max(500),
      subscriberNumber: Joi.number(),
      view: Joi.number(),
      rating: Joi.number().min(0).max(5),
      originalFee: Joi.number().min(0).max(500),
      promotionStart: Joi.date(),
      promotionEnd: Joi.date(),
    })
    .min(1),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.custom(objectId),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
