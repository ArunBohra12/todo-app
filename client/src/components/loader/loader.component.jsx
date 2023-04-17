import './loader.styles.css';

const Loader = props => {
  const { otherStyles, className } = props;

  return <div style={otherStyles} className={`loading-spinner ${className || ''}`}></div>;
};

export default Loader;
