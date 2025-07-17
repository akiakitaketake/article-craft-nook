import React from "react";

type SimpleButtonProps = {
  text: string;
  onClick: () => void;
};

const SimpleButton: React.FC<SimpleButtonProps> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default SimpleButton;
