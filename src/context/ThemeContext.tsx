'use client'

import { createContext, useContext, ReactNode } from 'react';
import { InstituteConfig } from '@/api/config';

interface ThemeContextType {
  config: InstituteConfig | null;
}

const ThemeContext = createContext<ThemeContextType>({ config: null });

export function ThemeProvider({ 
  children, 
  config 
}: { 
  children: ReactNode;
  config: InstituteConfig;
}) {
  return (
    <ThemeContext.Provider value={{ config }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 