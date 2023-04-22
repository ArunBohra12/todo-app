import './sidebarList.styles.css';

const SidebarList = props => {
  const { title, icon, selected } = props;

  return (
    <div className={`sidebar__list-item ${selected ? 'selected' : ''}`}>
      {icon}
      <div>{title}</div>
    </div>
  );
};

export default SidebarList;
