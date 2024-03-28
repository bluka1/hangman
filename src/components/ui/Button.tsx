import { FormEvent } from 'react';

const Button = ({
  text,
  isDisabled,
  handleClick,
}: {
  text: string;
  isDisabled: boolean;
  handleClick: (e: FormEvent) => void | (() => void);
}) => {
  return (
    <button onClick={handleClick} className="button" disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
