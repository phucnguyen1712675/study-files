const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./admin.route/user.route');
const categoryRoute = require('./admin.route/category.route');
const subCategoryRoute = require('./admin.route/sub_category.route');
const courseRoute = require('./guest.route/course.route');
const myCourseRoute = require('./student.route/my_course.route');
const docsRoute = require('./docs.route');
const studentRoute = require('./student.route');
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
    route: courseRoute,
  },
  {
    path: '/student/myCourses',
    route: myCourseRoute,
  },
  {
    path: '/students',
    route: studentRoute,
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
