import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Task from '../models/taskModel.js';

const createTask = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Not authorized for this request', 401));
  }

  const { title, description, startDate, endDate } = req.body;
  const { id } = req.user;

  if (!title) {
    return next(new AppError('Please provide a title for the task', 400));
  }

  const taskData = {
    user: id,
    title,
    description,
    startDate,
    endDate,
  };

  const task = await Task.create(taskData);

  task.__v = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

export default {
  createTask,
};
