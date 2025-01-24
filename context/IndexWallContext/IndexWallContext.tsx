import React, {createContext, useState, ReactNode} from 'react';

interface IndexWallContextProps {
  activeWallIndex: number | null;
  setActiveWallIndex: (index: number | null) => void;
}

const IndexWallContext = createContext<IndexWallContextProps>({
  activeWallIndex: null,
  setActiveWallIndex: () => {},
});

export const IndexWallProvider = ({children}: {children: ReactNode}) => {
  const [activeWallIndex, setActiveWallIndex] = useState<number | null>(null);

  return (
    <IndexWallContext.Provider value={{activeWallIndex, setActiveWallIndex}}>
      {children}
    </IndexWallContext.Provider>
  );
};

export default IndexWallContext;
