const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { historyService } = require('../services');

const createHistory = catchAsync(async (req, res) => {
  const history = await historyService.createHistory(req.body);
  res.status(httpStatus.CREATED).send(history);
});

const getHistories = catchAsync(async (req, res) => {
  const result = await historyService.getAllHistoryOfMyCourseId(req.params.myCourseId);
  res.send(result);
});

const updateHistory = catchAsync(async (req, res) => {
  const history = await historyService.updateHistoryById(req.params.historyId, req.body);
  res.send(history);
});

module.exports = {
  createHistory,
  getHistories,
  updateHistory,
};
