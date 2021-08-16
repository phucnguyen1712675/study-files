const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { watchListService } = require('../services');

const createWatchList = catchAsync(async (req, res) => {
  const watchList = await watchListService.createWatchList(req.body);
  res.status(httpStatus.CREATED).send(watchList);
});

const getAllWatchListOfStudent = catchAsync(async (req, res) => {
  const watchList = await watchListService.getAllWatchListOfStudent(req.params.userId);
  res.send(watchList);
});

const updateWatchList = catchAsync(async (req, res) => {
  const watchList = await watchListService.updatewatchListById(req.params.userId, req.body);
  res.send(watchList);
});

const deleteWatchList = catchAsync(async (req, res) => {
  await watchListService.deleteWatchListById(req.params.watchListId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWatchList,
  getAllWatchListOfStudent,
  updateWatchList,
  deleteWatchList,
};
