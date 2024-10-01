import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  InputModeOptions,
  TextInputProps,
} from 'react-native';
import {Colors, Fonts, Radius} from '../tokens';
import EyeOpen from '../../assets/images/icon/iconFunc/eye-open';
import EyeClosed from '../../assets/images/icon/iconFunc/eye-closed';

interface IInputProps {
  inputModeText?: InputModeOptions;
  textPlaceholder?: string;
  isPassword?: boolean;
  errorState?: boolean;
}

export function Input({
  inputModeText,
  textPlaceholder,
  isPassword,
  errorState,
  ...props
}: IInputProps & TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={{
          ...styles.input,
          color: !errorState ? Colors.black : Colors.red,
        }}
        {...props}
        inputMode={inputModeText}
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholder={textPlaceholder}
      />
      {isPassword && (
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(state => !state)}>
          {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    maxWidth: '100%',
    width: '100%',
    height: 48,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: Colors.almostWhite,
    color: Colors.black,
    borderRadius: Radius.r8,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
  },
  inputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
