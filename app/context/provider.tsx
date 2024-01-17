'use client';

import { createContext, useEffect, useState } from 'react';

export const MyContext = createContext("dark");

export function MyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MyContext.Provider value="light">{children}</MyContext.Provider>;
}