import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonAuth from '../../shared/ButtonAuth/ButtonAuth';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {validateEmail} from '../../customFunc/customFunc';
import {
  errorNumberCodeRestore,
  errorTextEmailRestore,
} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';

function NewPasswordScreen({navigation}: any) {
  const [restoreNewPasswordLogin, setRestoreNewPasswordLogin] =
    useState<string>('');
  const [restoreRepeatNewPasswordLogin, setRestoreRepeatNewPasswordLogin] =
    useState<string>('');
  const [disabledRestoreNewPasswordState, setDisabledRestoreNewPasswordState] =
    useState<boolean>(true);

  useEffect(() => {
    const isFormValid =
      restoreNewPasswordLogin === restoreRepeatNewPasswordLogin &&
      restoreNewPasswordLogin.length > 0;
    return isFormValid
      ? setDisabledRestoreNewPasswordState(true)
      : setDisabledRestoreNewPasswordState(false);
  }, [restoreNewPasswordLogin, restoreRepeatNewPasswordLogin]);

  const onSubmitCode = () => {
    navigation.navigate('SuccessScreen');
  };

  return (
    <AuthSection title="Восстановление пароля" navigation={navigation}>
      <View style={styles.inputs}>
        <Input
          textPlaceholder="Введите новый пароль"
          inputModeText="text"
          onChangeText={setRestoreNewPasswordLogin}
        />
        <Input
          textPlaceholder="Повторите новый пароль"
          inputModeText="text"
          onChangeText={setRestoreRepeatNewPasswordLogin}
        />
        <ButtonAuth
          textBtn="Восстановить пароль"
          disabledState={!disabledRestoreNewPasswordState}
          onPress={onSubmitCode}
        />
      </View>
    </AuthSection>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: Gaps.g8,
  },
});

export default NewPasswordScreen;
