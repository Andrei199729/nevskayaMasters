import React, {createContext, useState, useContext} from 'react';

const DataContext = createContext<any>(null);

export const DataProvider = ({children}: any) => {
  const [sharedData, setSharedData] = useState(null);

  return (
    <DataContext.Provider value={{sharedData, setSharedData}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
