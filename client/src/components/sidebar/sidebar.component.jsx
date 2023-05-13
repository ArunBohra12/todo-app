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

export const sidebarSmartList = [
  {
    id: 'my-day',
    title: 'My Day',
    icon: <DayIcon />,
  },
  {
    id: 'important',
    title: 'Important',
    icon: <StarIcon />,
  },
];

const Sidebar = () => {
  const { lists, selectedList, setSelectedList } = ListContext();
  const { user } = AuthContext();

  const handleSidebarListSelection = async (type, id) => {
    if (type === selectedList.type && id === selectedList.id) return;

    await setSelectedList(type, id);
  };

  const taskSearchHandler = async e => {
    if (e.target.value === '') {
      handleSidebarListSelection('smart-list', 'my-day');
      return;
    }

    handleSidebarListSelection('search', e.target.value);
  };

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
        <input className='sidebar__search-input' type='text' placeholder='Search' onChange={taskSearchHandler} />
        <CrossIcon className='sidebar__search-icon' />
      </div>

      <div className='sidebar__smart-list'>
        {sidebarSmartList.map(smartListItem => (
          <SidebarList
            key={smartListItem.id}
            icon={smartListItem.icon}
            title={smartListItem.title}
            selected={selectedList.type === 'smart-list' && selectedList.id === smartListItem.id}
            onClick={() => handleSidebarListSelection('smart-list', smartListItem.id)}
          />
        ))}
      </div>

      {lists.length > 0 && <div className='sidebar__list-separator'></div>}

      <div className='sidebar__all-lists'>
        {lists.map(list => (
          <SidebarList
            key={list._id}
            title={list.name}
            icon={<ListIcon />}
            selected={selectedList.type === 'custom-list' && selectedList.id === list._id}
            onClick={() => handleSidebarListSelection('custom-list', list._id)}
          />
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
