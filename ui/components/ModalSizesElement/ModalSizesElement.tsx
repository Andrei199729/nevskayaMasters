import {Modal, View, Pressable, Text, StyleSheet} from 'react-native';
import {IDataElementsWall, IModalWall} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ElementWall from '../ElementWall/ElementWall';
import {arrDataElementsWall} from '../../../shared/texts';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';

export default function ModalSizesElement({
  setIsModalVisible,
  isModalVisible,
  nameElement,
  position,
  dataSizeElement,
  elementsData,
  selectedElement,
  ...props
}: IModalWall & any) {
  const modalClose = () => {
    setIsModalVisible(false);
    console.log(selectedElement);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        () => setIsModalVisible(false);
      }}>
      <View style={{position: 'absolute', top: -50, left: 100}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text>
                {position} {nameElement}
              </Text>
              {/* {Object.keys(selectedElement).map(key => (
                <Text key={key}>{`${selectedElement[key]}`}</Text>
              ))} */}
              <ButtonCustom textBtn="Удалить" onPress={modalClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 500,
    zIndex: 1,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
});
