const express = require('express');
const authRoute = require('./auth.route');
// admin route
const adminUserRoute = require('./admin.route/user.route');
const adminCategoryRoute = require('./admin.route/category.route');
const adminSubCategoryRoute = require('./admin.route/sub_category.route');
const adminCourseRoute = require('./admin.route/course.route');
// student route
const studentMyCourseRoute = require('./student.route/my_course.route');
const watchListRoute = require('./student.route/my_watch_list.route');
const ratingRoute = require('./guest.route/rating.route');
const feedbackRoute = require('./guest.route/feedback.route');
// guest route
const guestCourseRoute = require('./guest.route/course.route');
const guestCategoryRoute = require('./guest.route/category.route');
const guestSubCategoryRoute = require('./guest.route/sub_category.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  // admin route
  {
    path: '/admin/users',
    route: adminUserRoute,
  },
  {
    path: '/admin/courses',
    route: adminCourseRoute,
  },
  {
    path: '/admin/categories',
    route: adminCategoryRoute,
  },
  {
    path: '/admin/subCategories',
    route: adminSubCategoryRoute,
  },
  // student route
  {
    path: '/student/myCourses',
    route: studentMyCourseRoute,
  },
  {
    path: '/student/watchList',
    route: watchListRoute,
  },
  // guest route
  {
    path: '/courses',
    route: guestCourseRoute,
  },
  {
    path: '/categories',
    route: guestCategoryRoute,
  },
  {
    path: '/subCategories',
    route: guestSubCategoryRoute,
  },
  {
    path: '/ratings',
    route: ratingRoute,
  },
  {
    path: '/feedbacks',
    route: feedbackRoute,
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
