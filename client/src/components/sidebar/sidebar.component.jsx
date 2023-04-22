import {
  MdOutlineSearch as SearchIcon,
  MdClear as CrossIcon,
  MdOutlineWbSunny as DayIcon,
  MdStarBorder as StarIcon,
  MdFormatListBulleted as ListIcon,
  MdAdd as AddIcon,
} from 'react-icons/md';

import { AVATARS_URL } from '../../config/constants';
import ListContext from '../../context/list.context';
import AuthContext from '../../context/auth.context';
import SidebarList from '../sidebarList/sidebarList.component';

import './sidebar.styles.css';

const Sidebar = () => {
  const { lists } = ListContext();
  const { user } = AuthContext();

  return (
    <aside className='sidebar'>
      <div className='sidebar__profile'>
        <div className='sidebar__profile-avatar'>
          <img src={`${AVATARS_URL}/${user.avatar}`} alt={user.name} />
        </div>
        <div className='sidebar__profile-details'>
          <div className='sidebar__profile-name'>{user.name}</div>
          <div className='sidebar__profile-email'>{user.email}</div>
        </div>
      </div>

      <div className='sidebar__search'>
        <SearchIcon className='sidebar__search-icon' />
        <input className='sidebar__search-input' type='text' placeholder='Search' />
        <CrossIcon className='sidebar__search-icon' />
      </div>

      <div className='sidebar__smart-list'>
        <SidebarList title='My Day' icon={<DayIcon />} selected />
        <SidebarList title='Important' icon={<StarIcon />} />
      </div>

      <div className='sidebar__list-separator'></div>

      <div className='sidebar__all-lists'>
        {lists.map(list => (
          <SidebarList key={list._id} title={list.name} icon={<ListIcon />} />
        ))}
      </div>

      <div className='sidebar__footer'>
        <div className='sidebar__new-list'>
          <AddIcon />
          <span>New List</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
