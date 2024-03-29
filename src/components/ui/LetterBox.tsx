const LetterBox = ({
  letter,
  className,
}: {
  letter: string;
  className: string | null;
}) => {
  return <span className={`${className} letter-box`}>{letter}</span>;
};

export default LetterBox;
