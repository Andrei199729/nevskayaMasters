import {StyleSheet, Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Colors, Gaps} from '../../../shared/tokens';
import ButtonProfile from '../../../shared/ButtonProfile/ButtonProfile';

export default function ProfilePopup() {
  return (
    <View style={styles.containerProfilePopup}>
      <ButtonProfile textBtn="Профиль" />
      <ButtonProfile textBtn="Настройки" />
      <ButtonProfile textBtn="Выйти" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerProfilePopup: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: 96,
    gap: Gaps.g10,
    position: 'absolute',
    right: 16,
    top: 47,
    zIndex: 1,
    padding: 12,
  },
});
