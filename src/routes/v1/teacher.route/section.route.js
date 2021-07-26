const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { sectionValidation } = require('../../../validations');
const { sectionController } = require('../../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCourses'), validate(sectionValidation.createSection), sectionController.createSection)
  .get(auth('manageCourses'), validate(sectionValidation.getSections), sectionController.getSections);

router
  .route('/details')
  .get(auth('manageCourses'), validate(sectionValidation.getSections), sectionController.getSectionsDetails);

module.exports = router;
