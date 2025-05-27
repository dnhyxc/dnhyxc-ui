import { useState } from 'react';
import { Button } from '@dnhyxc-ui/base';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Button onClick={onClick}>{count}</Button>
    </>
  );
}

export default App;
