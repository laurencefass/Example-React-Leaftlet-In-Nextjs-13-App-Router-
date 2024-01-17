'use client'

import { useIsClient } from '@/hooks/useIsClient';
import React, { useState, useEffect } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type CounterState = {
    count1: number,
    count2: number,
} | null;

const context = createContext<CounterState>(null);

const Counter1 = () => {
    const client = useIsClient();

    // s is the return value of useState of the form [value, setValue] 
    const count1 = useContextSelector(context, s => s[0].count1);
    const setState = useContextSelector(context, s => s[1]);
    const increment = () => setState(s => ({
        ...s,
        count1: s.count1 + 1,
    }));
    return (
        <div>
        <span>Counter1.count1: {count1}</span>
        <button type="button" onClick={increment}>+1</button>
        {client && <span>{Math.random().toFixed(2)}</span>} 
        </div>
    );
};

const Sub1 = () => {
    const client = useIsClient();
    // s is the return value of useState of the form [value, setValue] 
    const count1 = useContextSelector(context, s => s[0].count1);
    return <div>
        <span>Sub1.Count1: {count1}</span>
        {client && <span>{Math.random().toFixed(2)}</span>} 
    </div>
};

const Counter2 = () => {
    const client = useIsClient();

  const count2 = useContextSelector(context, s => s[0].count2);
  const setState = useContextSelector(context, s => s[1]);
  const increment = () => setState((s: CounterState) => ({
    ...s,
    count2: s && s.count2 + 1,
  }));
  return (
    <div>
      <span>Couter2.count2: {count2}</span>
      <button type="button" onClick={increment}>+1</button>
      {client && <span>{Math.random().toFixed(2)}</span>} 
    </div>
  );
};

export const UseSelectorStateProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const mystate = useState({ count1: 0, count2: 0 });
    return <>
        <context.Provider value={mystate}>
            {children}
        </context.Provider>
    </>
  };

export const UseSelectorDemo = () => (
  <UseSelectorStateProvider>
    <Counter1 />
    <Sub1/>    
    <Counter2 />
  </UseSelectorStateProvider>
);
