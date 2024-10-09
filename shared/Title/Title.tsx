import {StyleSheet, Text} from 'react-native';
import {Fonts, Colors} from '../tokens';

interface ITitle {
  title?: string;
}

export default function Title({title}: ITitle) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.f24,
    color: Colors.black,
    lineHeight: 28,
  },
});
