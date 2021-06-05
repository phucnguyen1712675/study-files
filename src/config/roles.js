const roles = ['user', 'teacher', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['updateUser', 'getUsers']);
roleRights.set(roles[1], ['updateCourse', 'addCourse', 'updateTeacher', 'getTeachers']);
roleRights.set(roles[2], [
  'manageUsers',
  'manageTeachers',
  'manageCategories',
  'getUsers',
  'getTeachers',
  'getCategories',
  'deleteCourse',
]);

module.exports = {
  roles,
  roleRights,
};
