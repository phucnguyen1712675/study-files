const roles = ['user', 'admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getStudents', 'manageStudents']);
roleRights.set(roles[2], ['getCourse', 'manageCourse']);
roleRights.set(roles[3], ['getCourse', 'manageCourse']);

module.exports = {
  roles,
  roleRights,
};
