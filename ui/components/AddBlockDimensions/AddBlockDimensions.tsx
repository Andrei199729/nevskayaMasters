import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React, {useEffect, useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts} from '../../../shared/tokens';
import {IAddBlockDimensions, IWallData} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalWall from '../ModalWall/ModalWall';
import ElementWall from '../ElementWall/ElementWall';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';

export default function AddBlockDimensions({
  numberWall,
  saveSizeWall,
  setArrElements,
  arrElements,
  setSizeElements,
  ...props
}: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickWallIncrease = () => {
    setModalVisible(!modalVisible);
  };
  // console.log(arrElements, 'product');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ModalWall
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          numberWall={numberWall}
          saveSizeWall={saveSizeWall}
          setArrElements={setArrElements}
          arrElements={arrElements}
          setSizeElements={setSizeElements}
        />
        <Pressable onPress={onClickWallIncrease}>
          <View>
            <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
            <View
              style={[
                styles.wallBlock,
                {
                  ...styles.addedWall,
                  borderColor: modalVisible ? Colors.green : Colors.black,
                },
              ]}>
              <View style={[styles.sizeWall, styles.wallTop]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall?.widthTop}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallRight]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall?.heightRight}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallBottom]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall?.widthBottom}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallLeft]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall?.heightLeft}
                </Text>
              </View>
              {saveSizeWall?.wallAngleDegree && (
                <>
                  <View
                    style={[styles.sizeWall, styles.borderLineAngle]}></View>
                  <View style={[styles.sizeWall, styles.wallAngleDegree]}>
                    <Text>{saveSizeWall?.wallAngleDegree}</Text>
                  </View>
                </>
              )}
            </View>
            <View>
              <Text>{saveSizeWall?.radiusWall}</Text>
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 100,
  },
  addedWallModal: {
    width: 400,
    height: '80%',
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
