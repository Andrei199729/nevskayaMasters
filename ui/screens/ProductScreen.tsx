import {ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext} from 'react';
import {DataContext} from '../../context/DataProvider';

export default function ProductScreen({navigation, route, ...props}: any) {
  const {productRoom} = route.params || [];
  // const arrElements = productRoom?.arrElements || [];
  console.log(productRoom, 'productRoom');
  console.log(JSON.stringify(productRoom, null, 2));

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {productRoom?.dataProduct.map((room: any, index: number) => {
            console.log(room.sizeElements, 'room');
            // Получаем элементы, которые относятся только к текущей стене (например, по индексу)
            // const wallElements =
            //   arrElements.find((element: any) => element.wall === index + 1)
            //     ?.elements || [];
            return (
              <AddBlockDimensions
                numberWall={index + 1}
                key={index}
                saveSizeWall={room?.currentSizeWall}
                arrElements={room?.sizeElements || []}
                // setArrElements={setArrElements}
              />
            );
          })}
        </ScrollView>
      </MainScreen>
    </HeaderScreen>
  );
}
