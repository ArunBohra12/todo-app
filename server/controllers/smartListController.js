import SmartList from '../models/smartListModel.js';
import catchAsync from '../utils/catchAsync.js';

const getAllSmartListTasks = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { type: listType } = req.params;

  const list = await SmartList.findOne({
    user: id,
    type: listType,
  }).populate('tasks');

  res.status(200).json({
    status: 'success',
    data: {
      tasks: list.tasks,
    },
  });
});

export default {
  getAllSmartListTasks,
};
