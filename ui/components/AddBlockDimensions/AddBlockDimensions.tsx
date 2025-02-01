import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {IAddBlockDimensions, IDataContext} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalWall from '../ModalWall/ModalWall';
import IndexWallContext from '../../../context/IndexWallContext/IndexWallContext';
import ModalVisibleContext from '../../../context/ModalVisible/ModalVisibleContext';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';

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
  setClickLineDraw,
  clickLineDraw,
  onClickLine,
  onClickEditDataWall,
  onClickWallIncrease,
  setModalVisible,
  modalVisible,
  ...props
}: AddBlockDimensionsProps & any) {
  const wallIndex = numberWall - 1;

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

        <Pressable
          onPress={() =>
            onClickWallIncrease(
              saveSizeWall[wallIndex]?.size,
              wallIndex,
              'wall',
            )
          }>
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
              {(saveSizeWall[wallIndex]?.size?.radiusWall ||
                saveSizeWall?.radiusWall) && (
                <>
                  <View
                    style={[styles.sizeWall, styles.borderLineAngle]}></View>
                  <View style={[styles.sizeWall, styles.radiusWall]}>
                    <Text>
                      {saveSizeWall[wallIndex]?.size?.radiusWall ||
                        saveSizeWall?.radiusWall}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View>
              {saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
              saveSizeWall?.wallAngleDegree ? (
                <Text>
                  {saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
                    saveSizeWall?.wallAngleDegree}
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
    marginBottom: 30,
  },
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  addedWall: {
    position: 'relative',
    width: 300,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
    height: 300,
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
  radiusWall: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
