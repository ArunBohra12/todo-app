import mongoose from 'mongoose';

const smartListSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['my-day', 'important'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const SmartList = mongoose.model('SmartList', smartListSchema);

export default SmartList;
