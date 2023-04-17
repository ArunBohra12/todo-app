import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../pages/tasks/tasks.page';

const PostAuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Tasks />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default PostAuthRoutes;
