import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name to the list'],
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const List = mongoose.model('List', listSchema);

export default List;
