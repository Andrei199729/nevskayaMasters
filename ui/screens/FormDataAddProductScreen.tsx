import {ScrollView, Text, View} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useContext, useState} from 'react';
import useInput from '../../hooks/useInput';
import SelectCustom from '../../shared/SelectCustom/SelectCustom';
import {arrCountWall} from '../../shared/texts';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import {
  IDataElementsWall,
  IDataFull,
  IDataProduct,
  INavigationScreenProps,
  IWallData,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DataContext} from '../../context/DataProvider';

export default function FormDataAddProductScreen() {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const nameRoom = useInput('');
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    defaultCount: 'Выберите количество стен',
  });

  const dataContext = useContext(DataContext);

  if (!dataContext) {
    return null;
  }

  const {arrElements, setArrElements} = dataContext;

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [countWall, setCountWall] = useState('');
  const [sizeWalls, setSizeWalls] = useState<IDataProduct[]>([]);
  // const [arrElements, setArrElements] = useState([]);
  const onSaveSizeWall = (currentSizeWall: IWallData) => {
    setSizeWalls(prev => {
      let updateDateWalls = [...prev, {currentSizeWall}];
      return updateDateWalls;
    });
  };

  const onSaveDataWall = () => {
    navigation.navigate('UnwrappedProduct', {
      dataProduct: sizeWalls,
      nameRoom: nameRoom.value,
      arrElements: arrElements,
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
            {sizeWalls?.map((wall, index) => {
              return (
                <AddBlockDimensions
                  numberWall={index + 1}
                  key={index}
                  saveSizeWall={wall.currentSizeWall}
                  setArrElements={setArrElements}
                />
              );
            })}
          </ScrollView>
          {Array.from({length: Number(countWall)}, (item, index) => {
            return (
              <AddSizeWall
                numberWall={index + 1}
                onSaveSizeWall={onSaveSizeWall}
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
