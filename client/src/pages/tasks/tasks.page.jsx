import Sidebar from '../../components/sidebar/sidebar.component';
import TaskListGroupItem from '../../components/taskListGroup/taskListGroup.component';

import './tasks.styles.css';

const Tasks = () => {
  return (
    <div className='tasks-page'>
      <Sidebar />
      <TaskListGroupItem />
    </div>
  );
};

export default Tasks;
