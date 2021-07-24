const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./admin.route/user.route');
const categoryRoute = require('./admin.route/category.route');
const subCategoryRoute = require('./admin.route/sub_category.route');
const guestCourseRoute = require('./guest.route/course.route');
const guestCategoryRoute = require('./guest.route/category.route');
const guestSubCategoryRoute = require('./guest.route/sub_category.route');
const guestTeacherRoute = require('./guest.route/user.route');
const myCourseRoute = require('./student.route/my_course.route');
const teacherCourseRoute = require('./teacher/course.route');
const teacherSectionRoute = require('./teacher/section.route');
const teacherLectureRoute = require('./teacher/lecture.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin/users',
    route: userRoute,
  },
  {
    path: '/admin/categories',
    route: categoryRoute,
  },
  {
    path: '/admin/subCategories',
    route: subCategoryRoute,
  },
  {
    path: '/courses',
    route: guestCourseRoute,
  },
  {
    path: '/categories',
    route: guestCategoryRoute,
  },
  {
    path: '/sub-categories',
    route: guestSubCategoryRoute,
  },
  {
    path: '/student/myCourses',
    route: myCourseRoute,
  },
  {
    path: '/teachers/info',
    route: guestTeacherRoute,
  },
  {
    path: '/teachers/courses',
    route: teacherCourseRoute,
  },
  {
    path: '/teachers/sections',
    route: teacherSectionRoute,
  },
  {
    path: '/teachers/lectures',
    route: teacherLectureRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
