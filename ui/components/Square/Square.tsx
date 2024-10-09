import {StyleSheet, Text, View} from 'react-native';
import {Colors, Radius} from '../../../shared/tokens';

export default function Square({size}: any) {
  return <View style={[styles.square, {width: size, height: size}]}></View>;
}

const styles = StyleSheet.create({
  square: {
    width: '33%',
    height: 100,
    borderRadius: Radius.r8,
    backgroundColor: Colors.lightGraySix,
  },
});
