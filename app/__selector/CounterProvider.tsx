'use client'

// CounterContext.tsx
import React, { createContext, useState } from 'react';

interface CounterContextType {
  count1: number;
  increment1: () => void;
  count2: number;
  increment2: () => void;
}

export const CounterContext = createContext<CounterContextType>({ 
  count1: 0, 
  increment1: () => {}, 
  count2: 0, 
  increment2: () => {}, 
});

export const CounterProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment1 = () => {
    setCount1(c => c + 1);
  };

  const increment2 = () => {
    setCount2(c => c + 1);
  };

  return (
    <CounterContext.Provider value={{ count1, increment1, count2, increment2 }}>
      {children}
    </CounterContext.Provider>
  );
};
