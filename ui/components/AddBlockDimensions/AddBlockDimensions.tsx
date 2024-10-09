import {Text, View} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import React, {useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';

interface IAddBlockDimensions {
  numberWall: number;
}

export default function AddBlockDimensions({numberWall}: IAddBlockDimensions) {
  const [height, setHeight] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [viewInput, setViewInput] = useState<boolean>(true);
  const [dataWalls, setDataWalls] = useState({
    height: '',
    width: '',
    thickness: '',
  });
  const validateNumber = (value: string) => {
    const number = parseInt(value);
    return !isNaN(number) && number > 0;
  };

  const handleSubmit = () => {
    if (
      validateNumber(height) &&
      validateNumber(width) &&
      validateNumber(thickness)
    ) {
      const wallData = {height, width, thickness};
      setDataWalls(wallData);
    }
    setViewInput(false);
  };
  return (
    <View>
      <Text>Стена №{numberWall}</Text>
      <View>
        <Text>Высота стены</Text>
        <Text>{dataWalls.height}</Text>
        {viewInput && (
          <Input
            value={height}
            onChangeText={setHeight}
            inputModeText={'numeric'}
          />
        )}
      </View>
      <View>
        <Text>Ширина стены</Text>
        <Text>{dataWalls.width}</Text>
        {viewInput && (
          <Input
            value={width}
            onChangeText={setWidth}
            inputModeText={'numeric'}
          />
        )}
      </View>
      <View>
        <Text>Толщина стены</Text>
        <Text>{dataWalls.thickness}</Text>
        {viewInput && (
          <Input
            value={thickness}
            onChangeText={setThickness}
            inputModeText={'numeric'}
          />
        )}
      </View>
      {viewInput && (
        <ButtonCustom
          textBtn="Сохранить данные"
          disabledState={!height || !width || !thickness}
          onPress={handleSubmit}
        />
      )}
    </View>
  );
}
