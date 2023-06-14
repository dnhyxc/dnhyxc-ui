import React, { type FC } from 'react';

const Button: FC<{
  children?: React.ReactElement;
  type: string;
  text: string;
}> = ({ children, type, text }) => {
  console.log(children, 'children');

  return (
    <button
      type="button"
      className={type === 'primary' ? 'primary' : 'default'}
    >
      {children || text}
    </button>
  );
};

export default Button;
