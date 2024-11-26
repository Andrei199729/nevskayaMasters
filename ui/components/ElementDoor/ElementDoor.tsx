import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../shared/tokens';

export default function ElementDoor() {
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <Text>2 Двери</Text>
      <View style={styles.elementDoor}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
