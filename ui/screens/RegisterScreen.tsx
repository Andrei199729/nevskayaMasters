import {StyleSheet, View} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AuthSection from '../section/AuthSection';
import {useEffect, useState} from 'react';
import {errorTextPassword} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import {validatePassword} from '../../customFunc/customFunc';
import HeaderScreen from './HeaderScreen';

function RegisterScreen({navigation}: any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [disabledState, setDisabledState] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextPassword,
  );

  useEffect(() => {
    if (
      email &&
      password &&
      repeatPassword
      // validatePassword(password)
    ) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  }, [email, password, repeatPassword]);

  return (
    <HeaderScreen>
      <AuthSection
        title="Регистрация"
        navigation={navigation}
        textBtn={'Войти'}
        pathLink={'Login'}
        textWithBtn="Уже есть профиль?">
        <View style={styles.inputs}>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={setEmail}
          />

          <Input
            textPlaceholder="Введите Пароль"
            isPassword
            onChangeText={setPassword}
            errorState={disabledState}
          />
          <Input
            textPlaceholder="Повторите пароль"
            isPassword
            onChangeText={setRepeatPassword}
          />
          <ButtonCustom
            textBtn="Зарегистрироваться"
            disabledState={disabledState}
          />
        </View>
        {!password && password.length > 0 && (
          <ErrorText errorText={localError} />
        )}
      </AuthSection>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: Gaps.g8,
  },
});

export default RegisterScreen;
