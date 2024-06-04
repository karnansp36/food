import React, { useMemo, useState } from 'react'

export default function Memo() {
    const [count, setCount] = useState(0);
    const [render, setRender] = useState(0);
    
    const memo =(num)=>{
        console.log('compilling...')
        let result= 0;
        for(let i=0; i< 1000000000; i++){
            result += num;
        }
        return result;
    
        
    }
    const result =useMemo(()=>memo(count), [count])
   
 
  return (
    <div>
        <h1>{count}</h1>
        <h2>{render}</h2>
        <h1>{result}</h1>
        <button onClick={()=> setCount(count+1)}>Count Increment</button>
        <button onClick={()=>setRender(render+1)}> Render Increment</button>
        


    </div>
  )
}
