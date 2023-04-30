import { useState } from 'react';
import {
  MdCheck as CheckIcon,
  MdOutlineStarBorder as StarBorderedIcon,
  MdOutlineStarPurple500 as StarFilledIcon,
} from 'react-icons/md';

import './taskItem.styles.css';

const TaskItem = props => {
  const { taskDetails } = props;

  const [isMarkedImportant, setIsMarkedImportant] = useState(false);

  return (
    <div className='task-box'>
      <div className='task-checkbox'>
        <CheckIcon className='check-icon' />
      </div>
      <div className='task-details'>
        <div className='task-title'>{taskDetails.title}</div>
      </div>
      <div className='mark-as-important'>
        {isMarkedImportant === true ? (
          <StarFilledIcon
            title='Marked as important'
            className='important-task-icon'
            onClick={() => setIsMarkedImportant(false)}
          />
        ) : (
          <StarBorderedIcon title='Mark as important' onClick={() => setIsMarkedImportant(true)} />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
