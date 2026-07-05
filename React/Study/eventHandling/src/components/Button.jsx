const Button = ({ children, text, color }) => {
  const finalColor = color ?? 'black';

  const onClickButton = (e) => {
    console.log(e);
    console.log(text);
  };

  return (
    <button
      onClick={onClickButton}
      onMouseEnter={onClickButton}
      style={{ color: finalColor }}
    >
      {text} - {finalColor.toUpperCase()}
      {children}
    </button>
  );
};

export default Button;
