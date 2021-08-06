const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { lectureConstant } = require('../constants');

const createLecture = {
  body: Joi.object().keys({
    sectionId: Joi.custom(objectId).required(),
    title: Joi.string().min(lectureConstant.LECTURE_NAME_MIN_LENGTH).max(lectureConstant.LECTURE_NAME_MAX_LENGTH).required(),
    canPreview: Joi.boolean(),
    video: Joi.string(),
  }),
};

const getLectures = {
  query: Joi.object().keys({
    title: Joi.string(),
    sectionId: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const testCreateLecture = {
  body: Joi.object().keys({
    sectionId: Joi.custom(objectId).required(),
    title: Joi.string().min(lectureConstant.LECTURE_NAME_MIN_LENGTH).max(lectureConstant.LECTURE_NAME_MAX_LENGTH).required(),
    canPreview: Joi.boolean().required(),
    videoUrl: Joi.string().required(),
  }),
};

const updateLecture = {
  params: Joi.object().keys({
    lectureId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().min(lectureConstant.LECTURE_NAME_MIN_LENGTH).max(lectureConstant.LECTURE_NAME_MAX_LENGTH),
      canPreview: Joi.boolean(),
      video: Joi.string(),
      ordinalNumber: Joi.number().min(lectureConstant.LECTURE_ORDINAL_NUMBER_MIN_VALUE),
    })
    .min(1),
};

const swapLectureOrdinalNumber = {
  body: Joi.object()
    .keys({
      firstLectureId: Joi.custom(objectId).required(),
      secondLectureId: Joi.custom(objectId).required(),
    })
    .min(2),
};

module.exports = {
  createLecture,
  getLectures,
  testCreateLecture,
  updateLecture,
  swapLectureOrdinalNumber,
};
