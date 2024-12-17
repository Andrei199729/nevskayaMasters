import React, {createContext, ReactNode, useState} from 'react';
import {IDataContext, IElementWall} from '../shared/types';

interface DataProviderProps {
  children: ReactNode;
}

// Создаём контекст
export const DataContext = createContext<IDataContext | null>(null);

export const DataProvider = ({children}: DataProviderProps) => {
  const [arrElements, setArrElements] = useState<IElementWall[]>([]);

  return (
    <DataContext.Provider value={{arrElements, setArrElements}}>
      {children}
    </DataContext.Provider>
  );
};
