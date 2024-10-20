import {StyleSheet, Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React, {useEffect, useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors} from '../../../shared/tokens';
import {IWallData} from '../../../shared/types';

interface IAddBlockDimensions {
  numberWall: number;
  saveSizeWall?: IWallData;
}

export default function AddBlockDimensions({
  numberWall,
  saveSizeWall,
  ...props
}: IAddBlockDimensions) {
  return (
    <View>
      <Text>Стена №{numberWall}</Text>
      <View style={[styles.wallBlock, styles.addedWall]}>
        <View style={[styles.sizeWall, styles.wallTop]}>
          <Text>{saveSizeWall?.widthTop}</Text>
        </View>
        <View style={[styles.sizeWall, styles.wallRight]}>
          <Text>{saveSizeWall?.heightRight}</Text>
        </View>
        <View style={[styles.sizeWall, styles.wallBottom]}>
          <Text>{saveSizeWall?.widthBottom}</Text>
        </View>
        <View style={[styles.sizeWall, styles.wallLeft]}>
          <Text>{saveSizeWall?.heightLeft}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wallBlock: {
    maxWidth: '100%',
    width: '100%',
  },
  addedWall: {
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
    height: 100,
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
});
