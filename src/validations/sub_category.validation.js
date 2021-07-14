const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
  }),
};

const getSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().custom(objectId),
  }),
};

const getSubCategoriesByCategoryId = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      categoryId: Joi.custom(objectId),
    })
    .min(1),
};

const increaseSubcriberNumberSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.required().custom(objectId),
  }),
};

const deleteSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategoriesByCategoryId,
  updateSubCategory,
  increaseSubcriberNumberSubCategory,
  deleteSubCategory,
};
