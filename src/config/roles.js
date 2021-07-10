const roles = ['user', 'admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageCourses', 'manageUsers', 'manageCategories']);
roleRights.set(roles[2], ['manageUsers', 'manageCourses']);
roleRights.set(roles[3], ['manageUsers', 'manageMyCourses', 'manageWatchList']);

module.exports = {
  roles,
  roleRights,
};
