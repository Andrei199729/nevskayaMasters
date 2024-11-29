import {ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';

export default function ProductScreen({navigation, route, ...props}: any) {
  const {productRoom} = route.params || {};
  console.log(productRoom.dataProduct, 'arrElements');

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
                arrElements={productRoom.arrElements}
              />
            );
          })}
        </ScrollView>
      </MainScreen>
    </HeaderScreen>
  );
}
