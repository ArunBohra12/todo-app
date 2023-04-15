import './button.styles.css';

const BUTTON_VARIANTS = {
  blue: 'btn-blue',
  default: 'btn-blue',
};

const Button = props => {
  const { children, className, variant, otherButtonAttributes } = props;

  const buttonVariant = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.default;

  return (
    <button className={`btn ${buttonVariant} ${className || ''}`} {...otherButtonAttributes}>
      {children}
    </button>
  );
};

export default Button;
