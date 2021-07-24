const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategoryId: Joi.required().custom(objectId),
    teacherId: Joi.required().custom(objectId),
    shortDescription: Joi.string().required(),
    detailDescription: Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.boolean(),
    fee: Joi.number(),
    originalFee: Joi.number(),
    promotionStart: Joi.date(),
    promotionEnd: Joi.date(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    subCategoryId: Joi.custom(objectId),
    teacherId: Joi.custom(objectId),
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
      shortDescription: Joi.string(),
      detailDescription: Joi.string(),
      image: Joi.string(),
      status: Joi.boolean(),
      fee: Joi.number(),
      subscriberNumber: Joi.number(),
      view: Joi.number(),
      rating: Joi.number(),
      originalFee: Joi.number(),
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
