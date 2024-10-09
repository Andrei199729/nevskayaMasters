import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {validateEmail} from '../../customFunc/customFunc';
import {errorTextEmailRestore} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import HeaderScreen from './HeaderScreen';

function RestorePasswordScreen({navigation}: any) {
  const [restoreEmailLogin, setRestoreEmailLogin] = useState<string>('');
  const [disabledRestoreState, setDisabledRestoreState] =
    useState<boolean>(true);
  const [restoreEmailError, setRestoreEmailError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextEmailRestore,
  );

  useEffect(() => {
    setRestoreEmailError(!restoreEmailLogin); // Устанавливаем ошибку, если email некорректен
    setDisabledRestoreState(!restoreEmailLogin); // Отключаем кнопку, если форма не валидна
  }, [restoreEmailLogin]);

  const onSubmitRestorePassword = () => {
    navigation.navigate('Success');
  };

  return (
    <HeaderScreen>
      <AuthSection title="Восстановление пароля" navigation={navigation}>
        <View style={styles.inputs}>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={setRestoreEmailLogin}
          />
          <ButtonCustom
            textBtn="Отправить"
            disabledState={disabledRestoreState}
            onPress={onSubmitRestorePassword}
          />
        </View>
        {restoreEmailError && restoreEmailLogin.length > 0 && (
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

export default RestorePasswordScreen;
