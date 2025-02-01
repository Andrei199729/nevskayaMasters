import React, {createContext, useState, ReactNode} from 'react';

interface IndexWallContextProps {
  activeWallIndex: number;
  setActiveWallIndex: (index: number) => void;
}

const IndexWallContext = createContext<IndexWallContextProps>({
  activeWallIndex: 0,
  setActiveWallIndex: () => {},
});

export const IndexWallProvider = ({children}: {children: ReactNode}) => {
  const [activeWallIndex, setActiveWallIndex] = useState<number>(0);

  return (
    <IndexWallContext.Provider value={{activeWallIndex, setActiveWallIndex}}>
      {children}
    </IndexWallContext.Provider>
  );
};

export default IndexWallContext;
