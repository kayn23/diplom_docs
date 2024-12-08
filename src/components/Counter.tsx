import { useState, type FC } from "react";

export const Counter: FC = () => {
  const [counter, setCounter] = useState(0);
  function increment() {
    setCounter(counter + 1);
  }
  return (
    <>
      <div>{counter}</div>
      <button onClick={increment}>Increment</button>
    </>
  );
};
