import {FlatList, ScrollView, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext, useEffect, useState} from 'react';
import {IDataProduct} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
import ModalVisibleContext from '../../context/ModalVisible/ModalVisibleContext';

export default function ProductScreen({navigation, route, ...props}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBacklight, setModalVisibleBacklight] = useState(false);
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
  const openModalVisible = (wallIndex: any, index: number) => {
    const stateModal = wallIndex === index ? wallIndex : null;
    setModalVisible(stateModal);
    setModalVisibleBacklight(stateModal);
  };
  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        {productRoom?.dataProduct.map((room: any, index: number) => {
          return (
            <DrawElement
              id={index}
              key={index}
              drawing={room?.drawingData}
              setSelectedLineIndex={setSelectedLineIndex}
              arrElements={room?.arrElements}
              setNumberCurrentWall={() => {}}
              isLast={isLast}
            />
          );
        })}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productRoom?.dataProduct.flatMap((room: IDataProduct & any) =>
            room.drawingData.walls.map((wall: any, wallIndex: number) => ({
              ...wall,
              wallIndex,
            })),
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item: wall, index}) => {
            const isActiveWall = wall.wallIndex === index;
            return (
              <AddBlockDimensions
                numberWall={wall.wallIndex + 1}
                arrElements={wall?.size?.arrElements}
                setNumberCurrentWall={setActiveWallIndex}
                saveSizeWall={wall.size || {}}
                setModalVisibleBacklight={setModalVisibleBacklight}
                modalVisibleBacklight={modalVisibleBacklight === wall.wallIndex}
                onClickLine={() => {}}
                onClickEditDataWall={() => {}}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible === wall.wallIndex}
                onClickWallIncrease={() =>
                  openModalVisible(wall.wallIndex, index)
                }
              />
            );
          }}
        />
      </MainScreen>
    </HeaderScreen>
  );
}
