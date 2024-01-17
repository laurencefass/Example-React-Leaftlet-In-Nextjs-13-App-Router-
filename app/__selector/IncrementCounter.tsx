'use client'

// IncrementButton.tsx
import React, { useContext } from 'react';
import { CounterContext } from './CounterProvider';

export const IncrementCounter = () => {
  const { increment1, increment2 } = useContext(CounterContext);
  return <>
    <button onClick={increment1}>Increment 1</button>
    <button onClick={increment2}>Increment 2</button>
  </>
};
