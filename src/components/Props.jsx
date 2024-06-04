import React, { useEffect, useState } from 'react';

export default function Props({ countINcrement }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    console.log("data fetching...");
    setItem(countINcrement());
  }, [countINcrement]); 

  return (
    <div>
      {item.map((items) => (
        <div key={items}>{items}</div>
      ))}
    </div>
  );
}
