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
import {useNavigation} from '@react-navigation/native';

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

export default function FormDataAddProductScreen() {
  const navigation = useNavigation<any>();
  const nameRoom = useInput('');
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    defaultCount: 'Выберите количество стен',
  });
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [countWall, setCountWall] = useState('');
  const [sizeWalls, setSizeWalls] = useState<any[]>([]);
  const [sizeElements, setSizeElements] = useState<any[] | undefined>([]);
  const [arrElements, setArrElements] = useState([]);
  const onSaveSizeWall = (currentSizeWall: any) => {
    setSizeWalls(prev => {
      let updateDateWalls = [...prev, {currentSizeWall}];
      return updateDateWalls;
    });
  };

  const onSaveDataWall = () => {
    navigation.navigate('UnwrappedProduct', {
      dataProduct: sizeWalls,
      nameRoom: nameRoom.value,
    });
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
            {sizeWalls?.map((wall: any, index: number) => {
              return (
                <AddBlockDimensions
                  numberWall={index + 1}
                  key={index}
                  saveSizeWall={wall.currentSizeWall}
                  setArrElements={setArrElements}
                  setSizeElements={setSizeElements}
                />
              );
            })}
          </ScrollView>
          {Array.from({length: Number(countWall)}, (item, index) => {
            return (
              <AddSizeWall
                numberWall={index + 1}
                onSaveSizeWall={onSaveSizeWall}
                setSizeWalls={(data: any) => setSizeWalls(data)}
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
