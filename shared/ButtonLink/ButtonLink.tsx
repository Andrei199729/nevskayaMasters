import {Text, Pressable, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../tokens';
import {NavigationProp} from '@react-navigation/native';
import {RootNavigationProp, RootStackParamList} from '../types';

function ButtonLink({
  navigationPath,
  textBtn,
  path,
}: {
  navigationPath: any;
  textBtn?: string;
  path?: string;
}) {
  const handlePress = () => {
    // Для экрана Main передаем объект с именем
    navigationPath.navigate(path, {name: textBtn || ''});
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
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

export default ButtonLink;
