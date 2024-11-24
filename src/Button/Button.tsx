import React from "react";
import "./Button.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
