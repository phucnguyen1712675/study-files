const roles = ['user', 'admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['admin', 'getUsers', 'manageUsers', 'manageCourses', 'manageCategories']);
roleRights.set(roles[2], ['manageUsers', 'manageCourses', 'getCourse', 'manageFeedbacks']);
roleRights.set(roles[3], [
  'manageUsers',
  'manageMyCourses',
  'getCourse',
  'manageCourse',
  'manageWatchList',
  'manageRatings',
  'manageHistories',
]);

module.exports = {
  roles,
  roleRights,
};
