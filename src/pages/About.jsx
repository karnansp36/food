import React, { useState } from 'react'



//The constructor takes an executor function with two arguments:
//resolve: A function to call when the operation succeeds.
//reject: A function to call when the operation fails.


export default function About() {
  function simulateAsyncOperation(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(value * 2); // Success scenario
        } else {
          reject(new Error("Operation failed")); // Error scenario
        }
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  simulateAsyncOperation(5)
    .then((result) => {
      console.log("Success! Doubled value:", result);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  
  return (
    <div>This is About

      
    </div>
  )
}
