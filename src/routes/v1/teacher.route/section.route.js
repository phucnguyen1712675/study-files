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
  .route('/swap-ordinal-number')
  .patch(
    auth('manageCourses'),
    validate(sectionValidation.swapSectionOrdinalNumber),
    sectionController.swapSectionOrdinalNumber
  );

router
  .route('/details')
  .get(auth('manageCourses'), validate(sectionValidation.getSections), sectionController.getSectionsDetails);

router
  .route('/:sectionId')
  .patch(auth('manageCourses'), validate(sectionValidation.updateSection), sectionController.updateSection);

module.exports = router;
