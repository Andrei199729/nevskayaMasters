import React, {createContext, useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';

// Создаём контекст
export const DataContext = createContext<any>(null);

export const DataProvider = ({children}: any) => {
  const [arrElements, setArrElements] = useState<any[]>([]);

  return (
    <DataContext.Provider value={{arrElements, setArrElements}}>
      {children}
    </DataContext.Provider>
  );
};
