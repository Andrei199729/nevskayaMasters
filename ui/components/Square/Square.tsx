import {StyleSheet, Text, View} from 'react-native';
import {Colors, Radius} from '../../../shared/tokens';
interface SquareProps {
  size: number;
}

export default function Square({size}: SquareProps) {
  console.log(size);

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
