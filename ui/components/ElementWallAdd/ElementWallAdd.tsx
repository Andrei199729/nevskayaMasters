import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../shared/tokens';
import ModalSizesElement from '../ModalSizesElement/ModalSizesElement';
import {IArrElements, StateElement} from '../../../shared/types';
import BlockStateElements from '../BlockStateElements/BlockStateElements';

interface IElementWallAdd {
  nameElement: string;
  stateElement: string;
  position: number;
  onPressVisible: () => void;
  addedElement?: boolean;
  setVisible: (index: number, isVisible: boolean) => void;
  element: IArrElements;
  isVisible: {[key: number]: boolean};
  elementsData: IArrElements[];
  setElementsData: (elementData: IArrElements[]) => void;
  setModalVisibleWall: (visible: boolean) => void;
}

export default function ElementWallAdd({
  nameElement,
  stateElement,
  position,
  onPressVisible,
  addedElement,
  setVisible,
  element,
  isVisible,
  elementsData,
  setElementsData,
  setModalVisibleWall,
  updateSizeWalls,
  arrElements,
  setEdit,
  setSizeWalls,
  ...props
}: IElementWallAdd | any) {
  return (
    <View style={{position: addedElement ? 'relative' : 'static'}}>
      <BlockStateElements
        nameElement={nameElement}
        stateElement={stateElement}
        position={position}
        onPressVisible={onPressVisible}
      />
      <ModalSizesElement
        position={position}
        nameElement={nameElement}
        isVisible={isVisible}
        setVisible={setVisible}
        element={element}
        elementsData={elementsData}
        setElementsData={setElementsData}
        setModalVisibleWall={setModalVisibleWall}
        updateSizeWalls={updateSizeWalls}
        setEdit={setEdit}
        setSizeWalls={setSizeWalls}
        arrElements={arrElements}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  elementsWallContainer: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 630,
    borderColor: Colors.black,
    borderWidth: 1,
  },

  elementVentilation: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderRadius: 1000,
    backgroundColor: Colors.menuBottom,
  },

  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    backgroundColor: Colors.white,
  },

  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
