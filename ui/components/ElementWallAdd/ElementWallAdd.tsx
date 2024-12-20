import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../shared/tokens';
import ModalSizesElement from '../ModalSizesElement/ModalSizesElement';
import {IArrElements, StateElement} from '../../../shared/types';

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
  ...props
}: IElementWallAdd) {
  return (
    <View style={{position: addedElement ? 'relative' : 'static'}}>
      <Pressable onPress={onPressVisible}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text>
            {position + 1} {nameElement}
          </Text>
          {stateElement === StateElement.Ventilation && (
            <View style={styles.elementVentilation}></View>
          )}
          {stateElement === StateElement.Door && (
            <View style={styles.elementDoor}></View>
          )}
          {stateElement === StateElement.Window && (
            <View
              style={{
                ...styles.elementWindow,
                backgroundColor: Colors.green,
              }}></View>
          )}
          {stateElement === StateElement.Socket && (
            <View
              style={{
                ...styles.elementWindow,
                backgroundColor: Colors.red,
              }}></View>
          )}
          {stateElement === StateElement.Battery && (
            <View
              style={{
                ...styles.elementWindow,
                backgroundColor: Colors.lightGray,
              }}></View>
          )}
        </View>
      </Pressable>
      <ModalSizesElement
        position={position}
        nameElement={nameElement}
        isVisible={isVisible}
        setVisible={setVisible}
        element={element}
        elementsData={elementsData}
        setElementsData={setElementsData}
        setModalVisibleWall={setModalVisibleWall}
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
