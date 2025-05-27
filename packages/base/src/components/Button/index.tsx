import React from 'react';
import './index.less';

interface IButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = ({ children, disabled, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <div className="buttonwrap">
      <h1>this is a Button</h1>
      <button disabled={disabled} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
