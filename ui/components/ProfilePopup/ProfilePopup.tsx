import {StyleSheet, Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Colors} from '../../../shared/tokens';

export default function ProfilePopup() {
  return (
    <View style={styles.containerProfilePopup}>
      <Text>Профиль</Text>
      <Text>Профиль</Text>
      <Text>Профиль</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerProfilePopup: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: 96,
    height: 104,
    position: 'absolute',
    right: 16,
    top: 47,
    zIndex: 1,
  },
});
