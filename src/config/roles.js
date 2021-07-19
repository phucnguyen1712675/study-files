const roles = ['user', 'admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'manageCourses', 'manageUsers', 'manageCategories']);
roleRights.set(roles[2], ['manageUsers', 'manageCourses', 'getCourse', 'manageFeedbacks']);
roleRights.set(roles[3], [
  'manageUsers',
  'manageMyCourses',
  'getCourse',
  'manageCourse',
  'manageWatchList',
  'manageRatings',
]);

module.exports = {
  roles,
  roleRights,
};
