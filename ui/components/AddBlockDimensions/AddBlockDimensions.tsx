import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {IAddBlockDimensions, IDataContext} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalWall from '../ModalWall/ModalWall';
import IndexWallContext from '../../../context/IndexWallContext/IndexWallContext';
import ModalVisibleContext from '../../../context/ModalVisible/ModalVisibleContext';

type AddBlockDimensionsProps = IAddBlockDimensions & IDataContext;

export default function AddBlockDimensions({
  numberWall,
  saveSizeWall,
  setArrElements,
  arrElements,
  setSizeWalls,
  setNumberCurrentWall,
  numberCurrentWall,
  setModalVisibleBacklight,
  modalVisibleBacklight,
  ...props
}: AddBlockDimensionsProps & any) {
  const wallIndex = numberWall - 1;
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onClickWallIncrease = () => {
    setIsDataFilled(!isDataFilled);
    if (isDataFilled) {
      setModalVisible(true); // открываем модальное окно
      setModalVisibleBacklight(false); // выключаем подсветку
    } else {
      // Если данные не заполнены, включаем подсветку
      setModalVisibleBacklight(true); // включаем подсветку
      setModalVisible(false); // не открываем модальное окно
    }

    // Устанавливаем текущую стену
    setNumberCurrentWall(numberWall - 1);
  };
  // Проверяем, заполнены ли все данные для стены
  // useEffect(() => {
  //   const isFilled =
  //     saveSizeWall[wallIndex]?.size &&
  //     (saveSizeWall[wallIndex]?.size.widthTop ||
  //       saveSizeWall[wallIndex]?.size.widthBottom ||
  //       saveSizeWall[wallIndex]?.size.heightLeft ||
  //       saveSizeWall[wallIndex]?.size.heightRight);
  //   setIsDataFilled(isFilled); // Обновляем состояние isDataFilled
  // }, [saveSizeWall, wallIndex]);
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
          setSizeWalls={setSizeWalls}
          numberCurrentWall={numberCurrentWall}
          wallIndex={wallIndex}
        />

        <Pressable onPress={onClickWallIncrease}>
          <View>
            <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
            <View
              style={[
                styles.wallBlock,
                {
                  ...styles.addedWall,
                  borderColor: modalVisibleBacklight
                    ? Colors.green
                    : Colors.black,
                },
              ]}>
              <View style={[styles.sizeWall, styles.wallTop]}>
                <Text style={styles.textDimensions}>
                  {String(
                    saveSizeWall[wallIndex]?.size?.widthTop ||
                      saveSizeWall?.widthTop ||
                      '',
                  )}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallRight]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall[wallIndex]?.size?.heightRight ||
                    saveSizeWall?.heightRight}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallBottom]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall[wallIndex]?.size?.widthBottom ||
                    saveSizeWall?.widthBottom}
                </Text>
              </View>
              <View style={[styles.sizeWall, styles.wallLeft]}>
                <Text style={styles.textDimensions}>
                  {saveSizeWall[wallIndex]?.size?.heightLeft ||
                    saveSizeWall?.heightLeft}
                </Text>
              </View>
              {(saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
                saveSizeWall?.wallAngleDegree) && (
                <>
                  <View
                    style={[styles.sizeWall, styles.borderLineAngle]}></View>
                  <View style={[styles.sizeWall, styles.wallAngleDegree]}>
                    <Text>
                      {saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
                        saveSizeWall?.wallAngleDegree}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View>
              {saveSizeWall[wallIndex]?.size?.radiusWall ||
              saveSizeWall?.radiusWall ? (
                <Text>
                  {saveSizeWall[wallIndex]?.size?.radiusWall ||
                    saveSizeWall?.radiusWall}
                </Text>
              ) : null}
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
