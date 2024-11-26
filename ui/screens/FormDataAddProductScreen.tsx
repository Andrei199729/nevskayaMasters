import {ScrollView, Text, View} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useState} from 'react';
import useInput from '../../hooks/useInput';
import SelectCustom from '../../shared/SelectCustom/SelectCustom';
import {arrCountWall} from '../../shared/texts';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import {IWallData} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';

interface IObjProduct {
  nameRoom?: string;
  countWall?: string;
  widthTop: string;
  widthBottom: string;
  heightLeft: string;
  heightRight: string;
  radiusWall: string;
  wallAngleDegree: string;
}

export default function FormDataAddProductScreen({navigation}: any) {
  const nameRoom = useInput('');
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    defaultCount: 'Выберите количество стен',
  });
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [countWall, setCountWall] = useState('');
  const [objProduct, setObjProduct] = useState<IObjProduct>({
    nameRoom: '',
    countWall: '',
    widthTop: '',
    widthBottom: '',
    heightLeft: '',
    heightRight: '',
    radiusWall: '',
    wallAngleDegree: '',
  });

  const [sizeWalls, setSizeWalls] = useState<any>({
    widthTop: '',
    heightRight: '',
    widthBottom: '',
    heightLeft: '',
    radiusWall: '',
    wallAngleDegree: '',
  });
  const [addDimensions, setAddDimensions] = useState<JSX.Element[]>([]);

  const onSaveSizeWall = (currentSizeWall: any) => {
    setAddDimensions(prev => [
      ...prev,
      <AddBlockDimensions
        key={Date.now()}
        numberWall={prev.length + 1}
        saveSizeWall={currentSizeWall}
      />,
    ]);
  };

  const onSaveDataWall = () => {
    setObjProduct({
      nameRoom: nameRoom.value,
      countWall: countWall,
      widthTop: sizeWalls.widthTop,
      widthBottom: sizeWalls.widthBottom,
      heightLeft: sizeWalls.heightLeft,
      heightRight: sizeWalls.heightRight,
      radiusWall: sizeWalls.heightRight,
      wallAngleDegree: sizeWalls.wallAngleDegree,
    });

    navigation.navigate('UnwrappedProduct');
  };

  return (
    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
      <View>
        <Text>Введите название комнаты</Text>
        <Input onChangeText={nameRoom.onChangeText} />
      </View>
      <View>
        <Text>Выберите количество стен</Text>
        <SelectCustom
          isSelect
          options={arrCountWall}
          textDefaultSelect={selectedTextDefault.defaultCount}
          isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
          onSelectedReset={() => {}}
          countWallText={(item: string) => setCountWall(item)}
        />
      </View>
      {!isActiveBtn && (
        <View>
          <Text>Введите размеры стен</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {addDimensions}
          </ScrollView>
          {Array.from({length: Number(countWall)}, (item, index) => {
            return (
              <AddSizeWall
                numberWall={index + 1}
                onSaveSizeWall={onSaveSizeWall}
                setSizeWalls={data => setSizeWalls(data)}
                key={index}
              />
            );
          })}
        </View>
      )}
      {!isActiveBtn && (
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataWall} />
      )}
    </ScrollView>
  );
}
