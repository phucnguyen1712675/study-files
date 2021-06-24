const httpStatus = require('http-status');
const { Student, User } = require('../models');
const ApiError = require('../utils/ApiError');

const createStudent = async (studentBody) => {
  if (await User.isEmailTaken(studentBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const student = await Student.create(studentBody);
  return student;
};

const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

const getStudentById = async (id) => {
  return Student.findById(id);
};

const getStudentByEmail = async (email) => {
  return Student.findOne({ email });
};

const updateStudentById = async (userId, updateBody) => {
  const student = await getStudentById(userId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(student, updateBody);
  await student.save();
  return student;
};

const deleteStudentById = async (userId) => {
  const student = await getStudentById(userId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await student.remove();
  return student;
};

module.exports = {
  createStudent,
  queryStudents,
  getStudentById,
  getStudentByEmail,
  updateStudentById,
  deleteStudentById,
};
