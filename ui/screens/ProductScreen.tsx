import {ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext, useEffect, useState} from 'react';
import {IDataProduct} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
import ModalVisibleContext from '../../context/ModalVisible/ModalVisibleContext';

export default function ProductScreen({navigation, route, ...props}: any) {
  const [drawModalVisible, setDrawModalVisible] = useState(false);
  const [wallModalVisible, setWallModalVisible] = useState(false);
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(
    null,
  ); // Выбранная линия
  const {productRoom} = route.params || {};
  const isLast = (index: number, paths: any) => index === paths.length - 1;
  const indexWallContext = useContext(IndexWallContext);

  if (!indexWallContext) {
    return null;
  }
  const {activeWallIndex, setActiveWallIndex} = indexWallContext;

  console.log(JSON.stringify(productRoom, null, 2), 'productRoom');

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        {productRoom?.dataProduct.map((room: any, index: number) => {
          return (
            <DrawElement
              id={index}
              key={index}
              drawing={room?.drawingData}
              // setDrawModalVisible={setDrawModalVisible}
              // drawModalVisible={drawModalVisible && selectedLineIndex === index}
              setSelectedLineIndex={setSelectedLineIndex}
              arrElements={room?.arrElements}
              setNumberCurrentWall={() => {}}
              isLast={isLast}
            />
          );
        })}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {productRoom?.dataProduct.map(
            (room: IDataProduct & any, index: number) => {
              return room.drawingData.walls.map(
                (wall: any, wallIndex: number) => {
                  const isActiveWall = wallIndex === activeWallIndex;
                  console.log(
                    JSON.stringify(wall?.size?.arrElements, null, 2),
                    'wall',
                  );

                  return (
                    <AddBlockDimensions
                      numberWall={wallIndex + 1}
                      key={wallIndex}
                      arrElements={wall?.size?.arrElements}
                      setNumberCurrentWall={setActiveWallIndex}
                      saveSizeWall={wall.size || {}}
                      // setModalVisibleBacklight={() => {}}
                      setModalVisibleBacklight={setDrawModalVisible}
                      modalVisibleBacklight={drawModalVisible && isActiveWall}
                    />
                  );
                },
              );
            },
          )}
        </ScrollView>
      </MainScreen>
    </HeaderScreen>
  );
}
