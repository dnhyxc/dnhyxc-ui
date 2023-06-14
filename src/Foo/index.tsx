import classnames from 'classname';
import React, { type FC } from 'react';
import styles from './index.module.less';

const Foo: FC<{ title: string; className?: string }> = (props) => (
  <h4 className={classnames(styles.fooWrap, props?.className)}>
    {props.title}
  </h4>
);

export default Foo;
