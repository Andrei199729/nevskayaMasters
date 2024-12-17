import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {validateNumber} from '../../../customFunc/customFunc';
import {TNumberObject} from '../../../shared/types';

interface IAddSizeWall {
  numberWall: number;
  onSaveSizeWall: (wallData: TNumberObject, numberWall: number) => void;
}

export default function AddSizeWall({
  numberWall,
  onSaveSizeWall,
}: IAddSizeWall) {
  const [heightRight, setHeightRight] = useState<string>('');
  const [widthTop, setWidthTop] = useState<string>('');
  const [heightLeft, setHeightLeft] = useState<string>('');
  const [widthBottom, setWidthBottom] = useState<string>('');
  const [wallAngleDegree, setWallAngleDegree] = useState<string>('');
  const [radiusWall, setRadiusWall] = useState<string>('');
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
      const wallData = {
        heightRight,
        heightLeft,
        widthTop,
        widthBottom,
        wallAngleDegree,
        radiusWall,
      };
      onSaveSizeWall(wallData, numberWall);
    }
    setViewInput(false);
  };

  return (
    <>
      {viewInput && (
        <View>
          <Text>Стена №{numberWall}</Text>
          <View style={styles.wallBlock}>
            <View>
              <Text>ширина верхней стены</Text>
              <Input
                value={widthTop}
                onChangeText={setWidthTop}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота правой стены</Text>
              <Input
                value={heightRight}
                onChangeText={setHeightRight}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>ширина нижней стены</Text>
              <Input
                value={widthBottom}
                onChangeText={setWidthBottom}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота левой стены</Text>
              <Input
                value={heightLeft}
                onChangeText={setHeightLeft}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>градус угла стены</Text>
              <Input
                value={wallAngleDegree}
                onChangeText={setWallAngleDegree}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>радиус дуги стены</Text>
              <Input
                value={radiusWall}
                onChangeText={setRadiusWall}
                inputModeText={'numeric'}
              />
            </View>
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
