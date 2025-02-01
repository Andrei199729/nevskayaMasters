import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '../../../shared/tokens';
import Svg, {G, Path, Text as TextSvg} from 'react-native-svg';
import React, {useEffect, useState, useMemo} from 'react';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import {
  IArrElements,
  IDataElementsWall,
  IElementData,
} from '../../../shared/types';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';

export default function DrawModalWall({
  drawModalVisible,
  setDrawModalVisible,
  drawing,
  id,
  setArrElements,
  arrElements,
  setSizeWalls,
  selectedLineIndex,
  numberCurrentWall,
  isLast,
}: any) {
  const [elementsWallModalVisible, setElementsWallModalVisible] =
    useState<boolean>(false);
  const [dataObj, setDataObj] = useState({
    nameElement: '',
    stateElement: '',
    id: 0,
  });

  const [elementsData, setElementsData] = useState<IArrElements[]>([]);
  const [visibleElements, setVisibleElements] = useState<{
    [key: number]: boolean;
  }>({});
  const onClickElementModal = () => {
    setElementsWallModalVisible(true);
    setDrawModalVisible(true);
  };
  const onSaveElement = (dataEl: IDataElementsWall) => {
    setDataObj(prev => {
      const update = {...prev, ...dataEl};
      return update;
    });
  };

  const toggleElementVisibility = (index: number, isVisible: boolean) => {
    setVisibleElements(prev => ({
      ...prev,
      [index]: isVisible, // Устанавливаем видимость только для конкретного элемента
    }));
  };
  const [clickLineDraw, setClickLineDraw] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const onClickLine = (index: number) => {
    setClickLineDraw(!clickLineDraw);
    setSelectedLine(prev => (prev === index ? null : index));
  };

  const stateColorLineDraw = (index: number | null) =>
    selectedLine === index ? 'red' : 'black';

  useEffect(() => {
    if (arrElements) {
      setElementsData(arrElements);
    }
  }, [arrElements]);

  const memoizedLines = useMemo(() => {
    return drawing?.shapes?.map((line: any, idx: number) => {
      const pathParts = line.path.split(' ');
      const startCoords = pathParts[0].slice(1).split(',');
      const endCoords = pathParts[pathParts.length - 1].slice(1).split(',');

      const startX = parseFloat(startCoords[0]);
      const startY = parseFloat(startCoords[1]);
      const endX = parseFloat(endCoords[0]);
      const endY = parseFloat(endCoords[1]);

      // Определяем позицию текста (примерно в середине линии)
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      return (
        <React.Fragment key={idx}>
          <G key={idx} onPressIn={() => onClickLine(idx)}>
            <Path
              d={line.path}
              stroke={
                !drawModalVisible
                  ? 'blue'
                  : selectedLine === idx
                  ? 'red'
                  : 'black'
              }
              strokeWidth={4}
              fill="none"
            />
          </G>
          {/* Вывод длины линии рядом с ней */}
          {!isLast(idx, drawing?.shapes) && (
            <TextSvg
              x={midX - 10}
              y={midY - 5} // Смещение вверх, чтобы текст не перекрывал линию
              fontSize="14"
              fill="blue"
              textAnchor="middle">
              {line.id}
            </TextSvg>
          )}
        </React.Fragment>
      );
    });
  }, [drawing, selectedLine]);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={drawModalVisible}
        onRequestClose={() => setDrawModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                zIndex: 4,
              }}>
              {elementsData?.map((element, index) => {
                return (
                  <ElementWallAdd
                    key={index}
                    element={element}
                    position={index}
                    nameElement={element.dataObj.nameElement}
                    stateElement={element.dataObj.stateElement}
                    onPressVisible={() => toggleElementVisibility(index, true)}
                    isVisible={visibleElements}
                    setVisible={toggleElementVisibility}
                    elementsData={elementsData}
                    setElementsData={setElementsData}
                    setModalVisibleWall={setElementsWallModalVisible}
                  />
                );
              })}
            </View>
            <Pressable onPress={onClickElementModal}>
              <View>
                <Svg
                  key={id}
                  style={styles.savedDrawing}
                  width="100%"
                  height="100%"
                  transform="scale(1.5)">
                  {/* Рендер всех линий */}
                  {memoizedLines}
                </Svg>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <ModalElementsWall
        modalVisible={elementsWallModalVisible}
        setModalVisible={setElementsWallModalVisible}
        numberWall={id}
        saveSizeWall={undefined}
        onSaveElement={onSaveElement}
        onSaveElementSize={onSaveDataElement}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 100,
    height: 500,
    zIndex: 1,
  },
  modalView: {
    width: '100%',
    height: 500,
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
  savedDrawing: {
    marginVertical: 100,
  },
});
