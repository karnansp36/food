import React, { useReducer, useState } from 'react'

export default function Reducer() {
    const initialState = 0;
    
    const reducer =(state, action)=>{
        switch(action){
            case "add":
                return state +1;
            case "subtract":
                return state -1;
            case "reset":
                return 0;
            default :
                return "Enter a wrong value";
        }

    }

    const [count , dispatch]= useReducer(reducer, initialState)
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={()=>dispatch("add")}>add</button>
        <button onClick={()=>dispatch("subtract")}>subtract</button>
        <button onClick={()=>dispatch("name")}>reset</button>


    </div>
  )
}
