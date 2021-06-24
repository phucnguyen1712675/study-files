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

const getSubCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    categoryId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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
  getSubCategories,
  getSubCategoriesByCategoryId,
  updateSubCategory,
  increaseSubcriberNumberSubCategory,
  deleteSubCategory,
};
