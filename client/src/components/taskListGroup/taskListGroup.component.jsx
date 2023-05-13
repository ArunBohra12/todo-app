import ListContext from '../../context/list.context';
import AddTaskItem from '../addTaskItem/addTaskItem.component';
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
    <div className='task-list-section'>
      <div className='task-list-group-heading-container'>
        <h1 className='task-list-group-heading'>{selectedListData.listName}</h1>
      </div>
      <div className='task-list-group-container'>
        {selectedListData.tasks.length === 0 && <NoData />}

        {selectedListData.tasks.length > 0 && (
          <div className='task-list-container'>
            {selectedListData.tasks.map((taskDetails, index) => (
              <TaskItem key={taskDetails._id} taskDetails={taskDetails} index={index} />
            ))}
          </div>
        )}
      </div>

      <AddTaskItem />
    </div>
  );
};

export default TaskListGroupItem;
