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

function SuccessScreen({navigation}: any) {
  const [restoreCodeLogin, setRestoreCodeLogin] = useState<string>('');
  const [disabledRestoreCodeState, setDisabledRestoreCodeState] =
    useState<boolean>(true);
  const [restoreCodeCodeError, setRestoreCodeError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorNumberCodeRestore,
  );

  const handleTextChange = (text: string) => {
    // Проверяем, что вводятся только числа
    const filteredText = text.replace(/[^0-9]/g, '');
    setRestoreCodeLogin(filteredText);
  };

  useEffect(() => {
    setRestoreCodeError(!restoreCodeLogin); // Устанавливаем ошибку, если email некорректен
    setDisabledRestoreCodeState(!restoreCodeLogin); // Отключаем кнопку, если форма не валидна
  }, [restoreCodeLogin]);

  const onSubmitCode = () => {
    navigation.navigate('NewPassword');
  };

  return (
    <AuthSection title="Восстановление пароля" navigation={navigation}>
      <View style={styles.inputs}>
        <Input
          textPlaceholder="Введите код, который пришел на почту"
          inputModeText="numeric"
          keyboardType="numeric"
          onChangeText={handleTextChange}
        />
        <ButtonAuth
          textBtn="Отправить"
          disabledState={disabledRestoreCodeState}
          onPress={onSubmitCode}
        />
      </View>
      {restoreCodeCodeError && restoreCodeLogin.length > 0 && (
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

export default SuccessScreen;
