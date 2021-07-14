const roles = ['user', 'admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getStudents', 'manageStudents']);
roleRights.set(roles[2], ['getUsers', 'manageUsers', 'getCourse', 'manageCourse', 'manageFeedback']);
roleRights.set(roles[3], ['getUsers', 'manageUsers', 'getCourse', 'manageCourse', 'manageMyCourses', 'manageRating']);

module.exports = {
  roles,
  roleRights,
};
