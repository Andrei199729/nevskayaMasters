import {Text, Pressable, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../tokens';

function ButtonLinkAuth({
  navigationPath,
  textBtn,
  path,
}: {
  navigationPath: any;
  textBtn?: string;
  path?: string;
}) {
  return (
    <Pressable
      onPress={() => navigationPath.navigate(path, {name: textBtn})}
      style={styles.button}>
      <Text style={styles.buttonText}>{textBtn}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: '100%',
    width: '100%',
  },
  buttonText: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    textDecorationLine: 'underline',
  },
});

export default ButtonLinkAuth;
