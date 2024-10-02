import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonAuth from '../../shared/ButtonAuth/ButtonAuth';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {errorTextEmail} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';

function LoginScreen({navigation}: any) {
  const [emailLogin, setEmailLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [disabledLoginState, setDisabledLoginState] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextEmail,
  );

  useEffect(() => {
    const isFormValid = emailLogin && passwordLogin.length > 6; // Проверяем, что и email, и пароль введены
    setEmailError(!emailLogin); // Устанавливаем ошибку, если email некорректен
    setDisabledLoginState(!isFormValid); // Отключаем кнопку, если форма не валидна
  }, [emailLogin, passwordLogin]);

  const onSubmitMainScreen = () => {
    navigation.navigate('Main');
  };

  return (
    <AuthSection
      title="Авторизация"
      navigation={navigation}
      textBtn={'Восстановить пароль'}
      pathLink={'RestorePassword'}
      textWithBtn="Забыли пароль?">
      <View style={styles.inputs}>
        <Input
          textPlaceholder="Введите Email"
          inputModeText="email"
          onChangeText={setEmailLogin}
          errorState={emailError}
        />
        <Input
          textPlaceholder="Введите Пароль"
          isPassword
          onChangeText={setPasswordLogin}
        />
        <ButtonAuth
          textBtn="Авторизоваться"
          disabledState={disabledLoginState}
          onPress={onSubmitMainScreen}
        />
      </View>
      {emailError && emailLogin.length > 0 && (
        <ErrorText errorText={localError} />
      )}
    </AuthSection>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: Gaps.g8,
  },
});

export default LoginScreen;
