import {
  Keyboard,
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
  IAddBlockDimensions,
  IModalWall,
  IWallData,
} from '../../../shared/types';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';
import ElementsProducts from '../../../shared/ElementsProducts/ElementsProducts';

export default function ModalWall({
  numberWall,
  saveSizeWall,
  modalVisible,
  setModalVisible,
  addElement,
  onSaveElementSize,
  setArrElements,
  arrElements,
  setSizeElements,
  ...props
}: IModalWall & any) {
  const [elementsWallModalVisible, setElementsWallModalVisible] =
    useState<boolean>(false);
  const [elementsData, setElementsData] = useState<any[]>(arrElements || []);
  const [dataObj, setDataObj] = useState({
    nameElement: '',
    stateElement: '',
    id: 0,
  });
  const [visibleElements, setVisibleElements] = useState<{
    [key: number]: boolean;
  }>({});
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
  const onSaveElement = (dataEl: any) => {
    setDataObj(prev => {
      const update = {...prev, ...dataEl};
      return update;
    });
  };
  const onSaveDataElement = (data: any, wall: number) => {
    setElementsData(prev => {
      // Создаем копию предыдущих данных
      let updatedData = [...prev];

      // Находим индекс стены
      const wallIndex = updatedData.findIndex(item => item.wall === wall);

      if (wallIndex !== -1) {
        // Если стена существует, добавляем новый элемент в её массив
        updatedData[wallIndex].elements.push({
          data,
          dataObj,
        });
      } else {
        // Если стены нет, создаём новую запись
        updatedData.push({
          wall: wall + 1,
          data,
          dataObj,
        });
      }

      return updatedData;
    });
  };
  console.log(elementsData, 'elementsData');
  console.log(JSON.stringify(elementsData, null, 2));
  const handleClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (arrElements) {
      setElementsData(arrElements);
    }
  }, [arrElements]);

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
                {elementsData?.map((element: any, index: any) => {
                  console.log(element, 'elementsData');

                  return (
                    <ElementWallAdd
                      key={index}
                      element={element?.data}
                      position={index}
                      nameElement={element?.dataObj?.nameElement}
                      stateElement={element?.dataObj?.stateElement}
                      onPressVisible={() =>
                        toggleElementVisibility(index, true)
                      }
                      isVisible={visibleElements}
                      setVisible={toggleElementVisibility}
                      elementsData={elementsData}
                      setElementsData={setElementsData}
                      onSaveElementSize={onSaveDataElement}
                      setModalVisibleWall={setElementsWallModalVisible}
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
                        {saveSizeWall?.widthTop}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallRight]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall?.heightRight}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallBottom]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall?.widthBottom}
                      </Text>
                    </View>
                    <View style={[styles.sizeWall, styles.wallLeft]}>
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {saveSizeWall?.heightLeft}
                      </Text>
                    </View>
                    {saveSizeWall?.wallAngleDegree && (
                      <>
                        <View
                          style={[
                            styles.sizeWall,
                            styles.borderLineAngle,
                          ]}></View>
                        <View style={[styles.sizeWall, styles.wallAngleDegree]}>
                          <Text
                            style={{
                              ...styles.textDimensions,
                              fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                            }}>
                            {saveSizeWall?.wallAngleDegree}
                          </Text>
                        </View>
                      </>
                    )}
                    <Text
                      style={{
                        ...styles.textDimensions,
                        fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                      }}>
                      {saveSizeWall?.radiusWall}
                    </Text>
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
  wallAngleDegree: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
