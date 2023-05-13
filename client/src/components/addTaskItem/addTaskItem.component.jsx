import { MdAdd as PlusIcon } from 'react-icons/md';

import './addTaskItem.styles.css';

const AddTaskItem = () => {
  return (
    <div className='add-task-item-container'>
      <div className='add-task-input-container'>
        <input type='text' id='add-task' className='add-task-input' placeholder='Add a task' />
        <label htmlFor='add-task' className='add-task-icon'>
          <PlusIcon />
        </label>
      </div>
    </div>
  );
};

export default AddTaskItem;
