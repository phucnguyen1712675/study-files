const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { courseConstant } = require('../constants');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategoryId: Joi.required().custom(objectId),
    teacherId: Joi.required().custom(objectId),
    shortDescription: Joi.string()
      .min(courseConstant.COURSE_SHORT_DESCRIPTION_MIN_LENGTH)
      .max(courseConstant.COURSE_SHORT_DESCRIPTION_MAX_LENGTH)
      .required(),
    detailDescription: Joi.string()
      .min(courseConstant.COURSE_DETAIL_DESCRIPTION_MIN_LENGTH)
      .max(courseConstant.COURSE_DETAIL_DESCRIPTION_MAX_LENGTH)
      .required(),
    image: Joi.string().required(),
    status: Joi.boolean(),
    originalFee: Joi.number()
      .min(courseConstant.COURSE_ORIGINAL_FEE_MIN_VALUE)
      .max(courseConstant.COURSE_ORIGINAL_FEE_MAX_VALUE),
    fee: Joi.number().min(courseConstant.COURSE_FEE_MIN_VALUE).max(courseConstant.COURSE_FEE_MAX_VALUE),
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
      shortDescription: Joi.string()
        .min(courseConstant.COURSE_SHORT_DESCRIPTION_MIN_LENGTH)
        .max(courseConstant.COURSE_SHORT_DESCRIPTION_MAX_LENGTH),
      detailDescription: Joi.string()
        .min(courseConstant.COURSE_DETAIL_DESCRIPTION_MIN_LENGTH)
        .max(courseConstant.COURSE_DETAIL_DESCRIPTION_MAX_LENGTH),
      image: Joi.string(),
      status: Joi.boolean(),
      fee: Joi.number().min(courseConstant.COURSE_FEE_MIN_VALUE).max(courseConstant.COURSE_FEE_MAX_VALUE),
      subscriberNumber: Joi.number(),
      view: Joi.number(),
      rating: Joi.number().min(courseConstant.COURSE_RATING_MIN_VALUE).max(courseConstant.COURSE_RATING_MAX_VALUE),
      originalFee: Joi.number()
        .min(courseConstant.COURSE_ORIGINAL_FEE_MIN_VALUE)
        .max(courseConstant.COURSE_ORIGINAL_FEE_MAX_VALUE),
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
