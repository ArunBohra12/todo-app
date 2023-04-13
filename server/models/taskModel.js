import mongoose from 'mongoose';

const taskStatuses = {
  todo: 'todo',
  done: 'done',
};

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the task'],
    },
    description: String,
    startDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: [taskStatuses.todo, taskStatuses.done],
      default: taskStatuses.todo,
    },
    endDate: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
