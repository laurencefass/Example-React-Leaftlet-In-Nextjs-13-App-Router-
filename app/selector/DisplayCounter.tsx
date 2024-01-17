'use client'

// CounterDisplay.tsx
import React, { useContext, useEffect } from 'react';
import { CounterContext } from './CounterProvider';

export const DisplayCounter1: React.FC = () => {
  const { count1 } = useContext(CounterContext);
  return <>
        { console.log("rendering DisplayCounter1")}
      <div>Counter Value: {count1}</div>
  </>
};

export const DisplayCounter2: React.FC = () => {
    const { count2 } = useContext(CounterContext);
    return <>
          { console.log("rendering DisplayCounter2")}
        <div>Counter Value: {count2}</div>
    </>
  };
   