import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Task from '../models/taskModel.js';

const createTask = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Not authorized for this request', 401));
  }

  const { title, description, startDate = Date.now(), endDate = Date.now() } = req.body;
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
    createdBy: id,
  };

  const task = await Task.create(taskData);

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

const getAllTasks = catchAsync(async (req, res) => {
  const { id } = req.user;

  const tasks = (await Task.find({ createdBy: id }).sort({ createdAt: 1 })) || [];

  res.status(200).json({
    status: 'success',
    data: {
      tasks,
    },
  });
});

const completeTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;

  await Task.findByIdAndUpdate(taskId, { status: 'done' });

  res.status(200).json({
    status: 'success',
    message: 'Task marked as completed',
  });
});

const removeTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndRemove(id);

  res.status(204).json({
    status: 'success',
    message: 'Successfully removed the task',
  });
});

const addStepToTask = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { id: taskId } = req.params;

  if (!title) {
    return next(new AppError('Please provide all the fields', 400));
  }

  const task = await Task.findByIdAndUpdate(taskId, { $push: { steps: { title } } }, { new: true });

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

const completeTaskStep = catchAsync(async (req, res, next) => {
  const { id: taskId } = req.params;
  const { stepId } = req.body;

  const task = await Task.findById(taskId);
  if (!task) return next(new AppError('Task not found', 400));

  const step = task.steps.id(stepId);
  if (!step) return next(new AppError('Step not found', 400));

  step.set({ status: 'done' });

  await task.save();

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

const removeTaskStep = catchAsync(async (req, res, next) => {
  const { id: taskId } = req.params;
  const { stepId } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId },
    { $pull: { steps: { _id: stepId } } },
    { new: true }
  );

  if (!updatedTask) return next(new AppError('Task not found', 400));

  res.status(204).json({
    status: 'success',
    data: {
      task: updatedTask,
    },
  });
});

export default {
  createTask,
  getAllTasks,
  completeTask,
  removeTask,
  addStepToTask,
  completeTaskStep,
  removeTaskStep,
};
