import React, { useCallback, useState } from 'react';
import Props from './Props'; // Assuming Props component is defined elsewhere

export default function CallExample() {
  const [count, setCount] = useState(1);
  const [light, setLight] = useState(false);


  const countINcrement =useCallback(() => {
    return [count + 10, count + 100];
  }, [count]) 

  const theme = {
    backgroundColor: light ? "white" : "black",
    color: light ? "black" : "white",
  };



  return (
    <div style={theme}>
      <input type="number" value={count} onChange={(e) =>setCount(parseInt(e.target.value)) } name="" id="" />

      <button onClick={() => setLight(!light)}>
        {light ? "Dark Mode" : "Light Mode"}
      </button>
      <Props countINcrement={countINcrement} />



    </div>
  );
}
