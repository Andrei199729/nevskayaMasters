import {StyleSheet, Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React, {useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors} from '../../../shared/tokens';
import {validateNumber} from '../../../customFunc/customFunc';

interface IAddSizeWall {
  numberWall: number;
  setSizeWall: any;
  onSaveSizeWall?: any;
}

export default function AddSizeWall({
  numberWall,
  setSizeWall,
  onSaveSizeWall,
}: IAddSizeWall) {
  const [heightRight, setHeightRight] = useState<string>('');
  const [widthTop, setWidthTop] = useState<string>('');
  const [heightLeft, setHeightLeft] = useState<string>('');
  const [widthBottom, setWidthBottom] = useState<string>('');
  const [viewInput, setViewInput] = useState<boolean>(true);

  const handleSubmit = () => {
    const validHeightRight = validateNumber(heightRight);
    const validHeightLeft = validateNumber(heightLeft);
    const validWidthTop = validateNumber(widthTop);
    const validWidthBottom = validateNumber(widthBottom);

    if (
      validHeightRight &&
      validHeightLeft &&
      validWidthTop &&
      validWidthBottom
    ) {
      const wallData = {heightRight, heightLeft, widthTop, widthBottom};
      setSizeWall(wallData);
      onSaveSizeWall(wallData);
    }
    setViewInput(false);
  };

  return (
    <>
      {viewInput && (
        <View>
          <Text>Стена №{numberWall}</Text>
          <View style={styles.wallBlock}>
            <Input
              value={widthTop}
              onChangeText={setWidthTop}
              inputModeText={'numeric'}
            />

            <Input
              value={heightRight}
              onChangeText={setHeightRight}
              inputModeText={'numeric'}
            />

            <Input
              value={widthBottom}
              onChangeText={setWidthBottom}
              inputModeText={'numeric'}
            />

            <Input
              value={heightLeft}
              onChangeText={setHeightLeft}
              inputModeText={'numeric'}
            />
          </View>
          <ButtonCustom
            textBtn="Сохранить данные"
            disabledState={
              !heightRight ||
              !widthTop ||
              !heightLeft ||
              !widthBottom ||
              !validateNumber(heightRight) ||
              !validateNumber(heightLeft) ||
              !validateNumber(widthTop) ||
              !validateNumber(widthBottom)
            }
            onPress={handleSubmit}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wallBlock: {
    maxWidth: '100%',
    width: '100%',
  },
});
