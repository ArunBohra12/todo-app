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
});

const List = mongoose.model('List', listSchema);

export default List;
