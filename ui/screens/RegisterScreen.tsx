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
import {INavigationScreenProps} from '../../shared/types';
import useInput from '../../hooks/useInput';

function RegisterScreen({navigation}: INavigationScreenProps) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const repeatPassword = useInput('');

  const [disabledState, setDisabledState] = useState<boolean>(true);
  const [inputError, setInputError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextPassword,
  );

  useEffect(() => {
    // Проверяем, совпадают ли пароли
    if (
      emailInput.value &&
      passwordInput.value === repeatPassword.value &&
      passwordInput.value.length !== 0
    ) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  }, [emailInput.value, passwordInput.value, repeatPassword.value]);

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
            onChangeText={emailInput.onChangeText}
            isSelectActive={emailInput.isActive}
          />

          <Input
            textPlaceholder="Введите Пароль"
            isPassword
            onChangeText={passwordInput.onChangeText}
            errorState={inputError}
            isSelectActive={passwordInput.isActive}
          />
          <Input
            textPlaceholder="Повторите пароль"
            isPassword
            onChangeText={repeatPassword.onChangeText}
            isSelectActive={repeatPassword.isActive}
            errorState={inputError}
          />
          <ButtonCustom
            textBtn="Зарегистрироваться"
            disabledState={disabledState}
          />
        </View>
        {passwordInput.value.length <= 6 ? (
          <ErrorText errorText={localError} />
        ) : null}
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
