import {ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext} from 'react';
import {DataContext} from '../../context/DataProvider';

export default function ProductScreen({navigation, route, ...props}: any) {
  const {productRoom} = route.params || {};
  const {arrElements, setArrElements} = useContext(DataContext);

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
