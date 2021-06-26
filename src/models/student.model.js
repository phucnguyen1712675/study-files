const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const studentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    private: true, // used by the toJSON plugin
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  role: {
    type: String,
    enum: roles,
    default: 'student',
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

const Student = mongoose.model('Student', studentSchema, 'Student');

module.exports = Student;
