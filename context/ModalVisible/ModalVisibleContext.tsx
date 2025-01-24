import React, {createContext, useState, ReactNode} from 'react';

interface ModalVisibleContextProps {
  modalVisible: boolean;
  setModalVisible: (index: boolean) => void;
}

const ModalVisibleContext = createContext<ModalVisibleContextProps>({
  modalVisible: false,
  setModalVisible: () => {},
});

export const ModalVisibleProvider = ({children}: {children: ReactNode}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ModalVisibleContext.Provider value={{modalVisible, setModalVisible}}>
      {children}
    </ModalVisibleContext.Provider>
  );
};

export default ModalVisibleContext;
