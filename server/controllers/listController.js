import List from '../models/listModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const createList = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const { name } = req.body;

  if (!name) {
    return next(new AppError('Please provide a name for your list', 400));
  }

  const list = await List.create({
    name,
    createdBy: userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      list,
    },
  });
});

const getAllLists = catchAsync(async (req, res) => {
  const { id } = req.user;

  const lists = await List.find({ createdBy: id });

  res.status(200).json({
    status: 'success',
    data: {
      lists,
    },
  });
});

const addTaskToList = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const { taskId } = req.body;

  if (!taskId) {
    return next(new AppError('Please provide all the details', 400));
  }

  const list = await List.findByIdAndUpdate(listId, { $addToSet: { tasks: taskId } }, { new: true });

  res.status(200).json({
    status: 'success',
    data: {
      list,
    },
  });
});

export default {
  getAllLists,
  createList,
  addTaskToList,
};
