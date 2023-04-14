import './singleLineInput.styles.css';

const SingleLineInput = props => {
  const { className, ...otherInputAttributes } = props;

  return <input className={`single-line-input ${className || ''}`} {...otherInputAttributes} />;
};

export default SingleLineInput;
