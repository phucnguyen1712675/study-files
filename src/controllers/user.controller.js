const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, courseService } = require('../services');
const { TEACHER_AVATAR_UPLOAD_PRESET } = require('../constants/cloudinary');
const { cloudinary } = require('../utils/cloudinary');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await userService.queryUsers(filter);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  var newBody;

  if (!req.body.avatar) {
    newBody = { ...req.body };
  } else {
    const { avatar } = req.body;

    const { secure_url } = await cloudinary.uploader.upload(avatar, {
      upload_preset: TEACHER_AVATAR_UPLOAD_PRESET,
    });

    newBody = { ...req.body, avatar: secure_url };
  }

  const user = await userService.updateUserById(req.params.userId, newBody, true);
  res.send(user);
});

const updateUserPassword = catchAsync(async (req, res) => {
  const user = await userService.updateUserPassword(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await courseService.deleteCoursesByUserId(req.params.userId);
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
