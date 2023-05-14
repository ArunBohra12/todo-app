import { useState } from 'react';
import { MdAdd as PlusIcon } from 'react-icons/md';

import { createTask } from '../../api/task';
import ListContext from '../../context/list.context';

import './addTaskItem.styles.css';

const AddTaskItem = () => {
  const { selectedList, setSelectedList } = ListContext();
  const [taskTitle, setTaskTitle] = useState('');

  const addTaskSubmitHandler = async e => {
    e.preventDefault();

    if (taskTitle === '') return;

    await createTask(selectedList, taskTitle);
    await setSelectedList(selectedList.type, selectedList.id);
  };

  return (
    <form className='add-task-item-container' onSubmit={addTaskSubmitHandler}>
      <div className='add-task-input-container'>
        <input
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          type='text'
          id='add-task'
          className='add-task-input'
          placeholder='Add a task'
          autoComplete='off'
        />
        <label htmlFor='add-task' className='add-task-icon'>
          <PlusIcon />
        </label>
      </div>
    </form>
  );
};

export default AddTaskItem;
