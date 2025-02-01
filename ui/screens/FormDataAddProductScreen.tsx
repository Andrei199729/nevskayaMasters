import {ScrollView, Text, View} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useContext, useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import SelectCustom from '../../shared/SelectCustom/SelectCustom';
import {arrCountWall} from '../../shared/texts';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import {
  IDataElementsWall,
  IDataProduct,
  IElementData,
  // IElementWall,
  IWallData,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Draw from '../components/Draw/Draw';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
interface IElementWall {
  data: IElementData;
  dataObj: IDataElementsWall;
}
export default function FormDataAddProductScreen() {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const nameRoom = useInput('');
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    defaultCount: 'Выберите количество стен',
  });

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [countWall, setCountWall] = useState('');
  const [numberCurrentWall, setNumberCurrentWall] = useState(0);
  const [sizeWalls, setSizeWalls] = useState<any[]>([]);
  const [arrElements, setArrElements] = useState<IElementWall[]>([]);
  const [modalVisibleBacklight, setModalVisibleBacklight] = useState(false);
  const [openFormDataSizeWall, setOpenFormDataSizeWall] = useState(false);
  const indexWallContext = useContext(IndexWallContext);

  if (!indexWallContext) {
    return null;
  }
  const {activeWallIndex, setActiveWallIndex} = indexWallContext;

  const onSaveSizeWall = (currentSizeWall: IWallData) => {
    setSizeWalls(prevWalls => {
      let updatedWalls = [...prevWalls, {currentSizeWall}];
      return updatedWalls;
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
        <View>
          <Draw
            setArrElements={setArrElements}
            arrElements={arrElements}
            setSizeWalls={setSizeWalls}
            onSaveSizeWall={onSaveSizeWall}
            sizeWalls={sizeWalls}
            setNumberCurrentWall={setActiveWallIndex}
            numberCurrentWall={activeWallIndex}
            setModalVisibleBacklight={setModalVisibleBacklight}
            modalVisibleBacklight={modalVisibleBacklight}
            setOpenFormDataSizeWall={setOpenFormDataSizeWall}
            openFormDataSizeWall={openFormDataSizeWall}
          />
        </View>
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
                  setSizeWalls={setSizeWalls}
                  setNumberCurrentWall={setActiveWallIndex}
                  numberCurrentWall={activeWallIndex}
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
      <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataWall} />
    </ScrollView>
  );
}
