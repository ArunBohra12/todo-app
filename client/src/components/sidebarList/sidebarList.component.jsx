import './sidebarList.styles.css';

const SidebarList = props => {
  const { title, icon, selected, ...otherListAttributes } = props;

  return (
    <div className={`sidebar__list-item ${selected ? 'selected' : ''}`} {...otherListAttributes}>
      {icon}
      <div>{title}</div>
    </div>
  );
};

export default SidebarList;
