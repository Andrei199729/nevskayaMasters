import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../shared/tokens';

export default function ElementWindow() {
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <Text>3 Окно</Text>
      <View
        style={{
          ...styles.elementWindow,
          backgroundColor: Colors.green,
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
