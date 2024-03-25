import './Button.css';

const Button = ({
  text,
  isDisabled,
}: {
  text: string;
  isDisabled: boolean;
}) => {
  return (
    <button className="button" disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
