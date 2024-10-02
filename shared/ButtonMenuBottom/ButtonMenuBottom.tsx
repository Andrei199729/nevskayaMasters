import {Pressable, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';

export default function ButtonMenuBottom({
  onPressClick,
  isActive,
  icon,
  text,
  btn,
}: {
  onPressClick: () => void;
  isActive: boolean;
  icon: JSX.Element;
  text: string | null;
  btn: string | null;
}) {
  return (
    <Pressable
      style={{
        ...styles.buttonHeader,
        opacity: isActive ? 0.5 : 1,
        backgroundColor: btn === 'plus' ? Colors.lightGrayThree : '',
        borderRadius: btn === 'plus' ? Radius.rC : '',
        width: btn === 'plus' ? 36 : 'auto',
        height: btn === 'plus' ? 36 : 'auto',
        justifyContent: btn === 'plus' ? 'center' : 'center',
      }}
      onPress={onPressClick}>
      {icon}
      {btn !== 'plus' && <Text style={styles.textMenuBottom}>{text}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonHeader: {
    flexDirection: 'column',
    cursor: 'pointer',
    gap: Gaps.g6,
    alignItems: 'center',
  },
  textMenuBottom: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.f9,
    color: Colors.white,
  },
});
