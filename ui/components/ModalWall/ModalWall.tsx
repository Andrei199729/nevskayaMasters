import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  IArrElements,
  IDataContext,
  IDataElementsWall,
  IElementData,
  // IElementWall,
  IModalWall,
} from '../../../shared/types';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';
type TModalWall = IModalWall &
  IDataContext & {
    addElement?: boolean;
    onSaveElementSize?: (element: IElementData) => void;
  };
interface IElementWall {
  data: IElementData;
  dataObj: IDataElementsWall;
}
export default function ModalWall({
  numberWall,
  saveSizeWall,
  modalVisible,
  setModalVisible,
  addElement,
  onSaveElementSize,
  setSizeWalls,
  numberCurrentWall,
  wallIndex,
  arrElements,
  setEdit,
  sizeWalls,
  ...props
}: TModalWall & any) {
  const [elementsWallModalVisible, setElementsWallModalVisible] =
    useState<boolean>(false);
  const [elementsData, setElementsData] = useState<IArrElements[]>([]);

  const [dataObj, setDataObj] = useState({
    nameElement: '',
    stateElement: '',
    id: 0,
  });
  const [visibleElements, setVisibleElements] = useState<{
    [key: number]: boolean;
  }>({});
  const [forceRender, setForceRender] = useState(false);
  const onClickElementModal = () => {
    setElementsWallModalVisible(true);
    setModalVisible(true);
  };
  const toggleElementVisibility = (index: number, isVisible: boolean) => {
    setVisibleElements(prev => ({
      ...prev,
      [index]: isVisible, // Устанавливаем видимость только для конкретного элемента
    }));
  };
  const onSaveElement = (dataEl: IDataElementsWall) => {
    setDataObj(prev => {
      const update = {...prev, ...dataEl};
      return update;
    });
  };

  const addElementToData = (data: IElementData) => {
    setElementsData((prev: any) => {
      const updatedElements = [...prev, {data, dataObj}];
      setEdit(updatedElements);
      return updatedElements;
    });
  };

  const updateSizeWalls = (data: IElementData, wallId: number) => {
    setSizeWalls((prevSizeWall: any[]) => {
      if (!Array.isArray(prevSizeWall)) {
        console.error(
          '❌ Ошибка: prevSizeWall не является массивом!',
          prevSizeWall,
        );
        return [];
      }

      // Создаем глубокую копию массива стен
      const newWalls = prevSizeWall.map(wall => {
        const updatedDrawingData = {...wall.drawingData};

        // Обновляем массив стен внутри drawingData
        updatedDrawingData.walls = updatedDrawingData.walls.map(
          (wallData: {size: {id: any; arrElements: any}}) => {
            if (wallData.size.id === numberCurrentWall) {
              return {
                ...wallData,
                size: {
                  ...wallData.size,
                  arrElements: {
                    wallId,
                    elements: [
                      ...(wallData.size?.arrElements?.elements ?? []),
                      {data, dataObj},
                    ], // Добавляем новый элемент
                  },
                },
              };
            }
            return wallData;
          },
        );

        return {
          ...wall,
          drawingData: updatedDrawingData,
        };
      });

      return newWalls;
    });
  };

  const onSaveDataElement = (data: IElementData, wallId: number) => {
    addElementToData(data);
    updateSizeWalls(data, wallId);
    setForceRender(prev => !prev); // Вызываем перерисовку, если необходимо
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setElementsData(arrElements ?? []);
  }, [arrElements]); // Обновляем, если `arrElements` изменилось

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <TouchableWithoutFeedback onPress={handleClose}>
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
                      nameElement={element?.dataObj?.nameElement || null}
                      stateElement={element?.dataObj?.stateElement || null}
                      onPressVisible={() =>
                        toggleElementVisibility(index, true)
                      }
                      isVisible={visibleElements}
                      setVisible={toggleElementVisibility}
                      elementsData={elementsData}
                      setElementsData={setElementsData}
                      setModalVisibleWall={setElementsWallModalVisible}
                      arrElements={arrElements}
                      setEdit={setEdit}
                    />
                  );
                })}
              </View>
              <Pressable onPress={onClickElementModal}>
                <View style={{backgroundColor: Colors.white}}>
                  <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
                  <View
                    style={[
                      styles.wallBlock,
                      styles.addedWall,
                      styles.addedWallModal,
                    ]}>
                    <View style={[styles.sizeWall, styles.wallTop]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {String(
                          saveSizeWall[wallIndex]?.size?.widthTop ||
                            saveSizeWall?.widthTop ||
                            '',
                        )}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallRight]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall[wallIndex]?.size?.heightRight ||
                          saveSizeWall?.heightRight}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallBottom]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall[wallIndex]?.size?.widthBottom ||
                          saveSizeWall?.widthBottom}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallLeft]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall[wallIndex]?.size?.heightLeft ||
                          saveSizeWall?.heightLeft}
                      </Text>
                    </View>
                    {(saveSizeWall[wallIndex]?.size?.radiusWall ||
                      saveSizeWall?.radiusWall) && (
                      <>
                        <View
                          style={[
                            styles.sizeWall,
                            styles.borderLineAngle,
                          ]}></View>
                        <View style={[styles.sizeWall, styles.radiusWall]}>
                          <Text
                            style={{
                              ...styles.textDimensions,
                              fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                            }}>
                            {saveSizeWall[wallIndex]?.size?.radiusWall ||
                              saveSizeWall?.radiusWall}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                  <View>
                    {saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
                    saveSizeWall?.wallAngleDegree ? (
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall[wallIndex]?.size?.wallAngleDegree ||
                          saveSizeWall?.wallAngleDegree}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ModalElementsWall
        modalVisible={elementsWallModalVisible}
        setModalVisible={setElementsWallModalVisible}
        numberWall={numberWall}
        saveSizeWall={saveSizeWall}
        onSaveElement={onSaveElement}
        onSaveElementSize={onSaveDataElement}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 500,
    zIndex: 1,
  },
  modalView: {
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
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  addedWall: {
    position: 'relative',
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  addedWallModal: {
    width: 400,
    height: '100%',
  },
  sizeWall: {
    position: 'absolute',
  },
  wallTop: {
    left: '50%',
    top: 0,
  },
  wallRight: {
    right: 0,
    top: '50%',
    transform: [{translateY: -10}],
  },
  wallBottom: {
    bottom: 0,
    left: '50%',
  },
  wallLeft: {
    top: '50%',
    left: 0,
    transform: [{translateY: -10}],
  },
  borderLineAngle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    borderStyle: 'dashed',
    top: '70%',
    width: '100%',
  },
  radiusWall: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
