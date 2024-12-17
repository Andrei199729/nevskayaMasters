import {ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext} from 'react';
import {DataContext} from '../../context/DataProvider';

export default function ProductScreen({navigation, route, ...props}: any) {
  const {productRoom} = route.params || {};
  const context = useContext(DataContext);

  // Если контекст равен null, возвращаем заглушку
  if (!context) {
    return <Text>Loading...</Text>;
  }

  const {arrElements, setArrElements} = context;

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {productRoom?.dataProduct.map((room: any, index: number) => {
            return (
              <AddBlockDimensions
                numberWall={index + 1}
                key={index}
                saveSizeWall={room?.currentSizeWall}
                arrElements={arrElements}
                setArrElements={setArrElements}
              />
            );
          })}
        </ScrollView>
      </MainScreen>
    </HeaderScreen>
  );
}
