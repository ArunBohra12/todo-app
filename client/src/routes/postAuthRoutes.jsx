import { Routes, Route, Navigate } from 'react-router-dom';
import { ListProvider } from '../context/list.context';
import Tasks from '../pages/tasks/tasks.page';

const PostAuthRoutes = () => {
  return (
    <ListProvider>
      <Routes>
        <Route path='/' element={<Tasks />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </ListProvider>
  );
};

export default PostAuthRoutes;
