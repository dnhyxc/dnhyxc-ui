import { Button as AntdButton } from 'antd';
import React, { type FC } from 'react';

interface IProps {
  children?: React.ReactElement | string;
  type?:
    | 'text'
    | 'link'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined;
  text: string;
  className?: string;
}

const Button: FC<IProps> = ({ children, type, text }) => {
  return (
    <AntdButton type={type} className={className}>
      {children || text}
    </AntdButton>
  );
};

export default Button;
