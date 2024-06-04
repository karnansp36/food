import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { decrement, increment } from '../redux/CounterSlice';
export default function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>

        <div>{count}</div>
        <button onClick={()=>dispatch(increment())}>increment</button>
        <button onClick={()=>dispatch(decrement())}>decrement</button>
    </div>
  )
}
