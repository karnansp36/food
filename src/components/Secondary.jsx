import React from 'react'
import { useSelector } from 'react-redux'

export default function Secondary() {
    const count2 = useSelector(state => state.counter.value);
  return (
    <div>{count2}</div>
  )
}
