import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  IAddBlockDimensions,
  IModalWall,
  IWallData,
} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import ElementWall from '../ElementWall/ElementWall';

export default function ModalWall({
  numberWall,
  saveSizeWall,
  modalVisible,
  setModalVisible,
  onSaveElement,
  addElement,
  onSaveElementSize,
  ...props
}: IModalWall & any) {
  const [elementsWallModalVisible, setElementsWallModalVisible] =
    useState<boolean>(false);
  const onClickElementModal = () => {
    setElementsWallModalVisible(true);
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                zIndex: 4,
              }}>
              {addElement}
            </View>
            <Pressable onPress={onClickElementModal}>
              <View style={{backgroundColor: Colors.white}}>
                <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
                <View
                  style={[
                    styles.wallBlock,
                    styles.addedWall,
                    styles.addedWallModal,
                  ]}>
                  <View style={[styles.sizeWall, styles.wallTop]}>
                    <Text
                      style={{
                        ...styles.textDimensions,
                        fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                      }}>
                      {saveSizeWall?.widthTop}
                    </Text>
                  </View>
                  <View style={[styles.sizeWall, styles.wallRight]}>
                    <Text
                      style={{
                        ...styles.textDimensions,
                        fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                      }}>
                      {saveSizeWall?.heightRight}
                    </Text>
                  </View>
                  <View style={[styles.sizeWall, styles.wallBottom]}>
                    <Text
                      style={{
                        ...styles.textDimensions,
                        fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                      }}>
                      {saveSizeWall?.widthBottom}
                    </Text>
                  </View>
                  <View style={[styles.sizeWall, styles.wallLeft]}>
                    <Text
                      style={{
                        ...styles.textDimensions,
                        fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                      }}>
                      {saveSizeWall?.heightLeft}
                    </Text>
                  </View>
                  {saveSizeWall?.wallAngleDegree && (
                    <>
                      <View
                        style={[
                          styles.sizeWall,
                          styles.borderLineAngle,
                        ]}></View>
                      <View style={[styles.sizeWall, styles.wallAngleDegree]}>
                        <Text
                          style={{
                            ...styles.textDimensions,
                            fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                          }}>
                          {saveSizeWall?.wallAngleDegree}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.textDimensions,
                      fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                    }}>
                    {saveSizeWall?.radiusWall}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ModalElementsWall
        modalVisible={elementsWallModalVisible}
        setModalVisible={setElementsWallModalVisible}
        numberWall={numberWall}
        saveSizeWall={saveSizeWall}
        onSaveElement={onSaveElement}
        onSaveElementSize={onSaveElementSize}
      />
    </>
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
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  addedWall: {
    position: 'relative',
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  addedWallModal: {
    width: 400,
    height: '100%',
  },
  sizeWall: {
    position: 'absolute',
  },
  wallTop: {
    left: '50%',
    top: 0,
  },
  wallRight: {
    right: 0,
    top: '50%',
    transform: [{translateY: -10}],
  },
  wallBottom: {
    bottom: 0,
    left: '50%',
  },
  wallLeft: {
    top: '50%',
    left: 0,
    transform: [{translateY: -10}],
  },
  borderLineAngle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    borderStyle: 'dashed',
    top: '70%',
    width: '100%',
  },
  wallAngleDegree: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
