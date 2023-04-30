import ListContext from '../../context/list.context';
import Loader from '../loader/loader.component';
import NoData from '../noData/noData.component';
import TaskItem from '../taskItem/taskItem.component';

import './taskListGroup.styles.css';

const TaskListGroupItem = () => {
  const { isLoading, selectedListData } = ListContext();

  if (isLoading === true) {
    return (
      <div className='task-list-group-loading'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='task-list-group-container'>
      <h1 className='task-list-group-heading'>{selectedListData.listName}</h1>

      {selectedListData.tasks.length === 0 && <NoData />}

      {selectedListData.tasks.map(taskDetails => (
        <TaskItem key={taskDetails._id} taskDetails={taskDetails} />
      ))}
    </div>
  );
};

export default TaskListGroupItem;
