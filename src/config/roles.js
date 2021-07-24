const roles = ['student', 'teacher', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['updateUser', 'getUser', 'manageMyCourses', 'manageWatchList']);
roleRights.set(roles[1], ['manageCourses', 'updateTeacher', 'getTeacher']);
roleRights.set(roles[2], ['manageUsers', 'manageTeachers', 'manageCategories', 'getUser', 'getTeacher', 'deleteCourse']);

module.exports = {
  roles,
  roleRights,
};
