import './Button.css';

const Button = ({
  text,
  isDisabled,
  handleClick,
}: {
  text: string;
  isDisabled: boolean;
  handleClick: () => void;
}) => {
  return (
    <button onClick={handleClick} className="button" disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
