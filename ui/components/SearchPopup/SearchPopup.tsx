import {Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React from 'react';
import PopupScreen from '../../screens/PopupScreen';

export default function SearchPopup() {
  return (
    <PopupScreen mainTitle="Поиск">
      <View>
        <Text>Фильтры</Text>
      </View>
    </PopupScreen>
  );
}
