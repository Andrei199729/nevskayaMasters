import {Modal, View, Pressable, Text, StyleSheet} from 'react-native';
// import {IDataElementsWall, IModal} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ElementWall from '../ElementWall/ElementWall';
import {arrDataElementsWall} from '../../../shared/texts';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';

export default function ModalSizesElement({
  setVisible,
  isVisible,
  nameElement,
  position,
  dataSizeElement,
  selectedElement,
  element,
  elementsData,
  setElementsData,
  onSaveElementSize,
  setModalVisibleWall,
  ...props
}: any) {
  const [isVisibleEditModal, setIsVisibleEditModal] = useState<boolean>(false);
  const onClickModalClose = () => {
    setVisible(position, false);
  };

  const [dataEditElement, setDataEditElement] = useState<any>({});

  const onDeleteElement = () => {
    const filteredObject = elementsData.filter(
      (item: any, index: number) => index !== position,
    );
    setElementsData(filteredObject);
    setVisible(position, false);
  };

  const onSaveEditedElement = (updatedData: any) => {
    const updatedElements = elementsData.map((item: any, index: number) =>
      index === position ? {...item, data: updatedData} : item,
    );
    console.log(updatedElements, 'updatedElements');

    setElementsData(updatedElements); // Обновляем состояние
    setIsVisibleEditModal(false); // Закрываем модальное окно редактирования
  };

  const onClickEdit = () => {
    setDataEditElement({
      nameElementWall: nameElement,
      locationElementTop: element.data.locationElementTop,
      locationElementRight: element.data.locationElementRight,
      locationElementLeft: element.data.locationElementLeft,
      locationElementBottom: element.data.locationElementBottom,
      widthTop: element.data.widthTop,
      widthBottom: element.data.widthBottom,
      heightLeft: element.data.heightLeft,
      heightRight: element.data.heightRight,
      radiusElement: element.data.radiusElement,
    });
    setIsVisibleEditModal(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!isVisible[position]}
      onRequestClose={() => {
        () => setVisible(position, false);
      }}>
      <ModalFormElement
        modalVisible={isVisibleEditModal}
        setModalVisible={setIsVisibleEditModal}
        numberWall={position + 1}
        nameElementWall={nameElement}
        onSaveElementSize={onSaveEditedElement}
        dataEditElement={dataEditElement}
        setModalVisibleWall={setModalVisibleWall}
      />
      <View style={{position: 'absolute', top: -50, left: 100}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text>
                {position + 1} {nameElement}
              </Text>
              {element.data.locationElementTop !== '' && (
                <View>
                  <Text> 1 расположение сверху</Text>
                  <Text>{element.data.locationElementTop}</Text>
                </View>
              )}
              {element.data.locationElementBottom !== '' && (
                <View>
                  <Text> 2 расположение снизу</Text>
                  <Text>{element.data.locationElementBottom}</Text>
                </View>
              )}
              {element.data.locationElementRight !== '' && (
                <View>
                  <Text> 3 расположение справа</Text>
                  <Text>{element.data.locationElementRight}</Text>
                </View>
              )}
              {element.data.locationElementLeft !== '' && (
                <View>
                  <Text> 4 расположение слева</Text>
                  <Text>{element.data.locationElementLeft}</Text>
                </View>
              )}
              {element.data.widthTop !== '' && (
                <View>
                  <Text> 5 размер стены сверху</Text>
                  <Text>{element.data.widthTop}</Text>
                </View>
              )}
              {element.data.widthBottom !== '' && (
                <View>
                  <Text> 6 размер стены снизу</Text>
                  <Text>{element.data.widthBottom}</Text>
                </View>
              )}
              {element.data.heightRight !== '' && (
                <View>
                  <Text> 7 размер стены справа</Text>
                  <Text>{element.data.heightRight}</Text>
                </View>
              )}
              {element.data.heightLeft !== '' && (
                <View>
                  <Text> 8 размер стены слева</Text>
                  <Text>{element.data.heightLeft}</Text>
                </View>
              )}
              {element.data.radiusElement !== '' && (
                <View>
                  <Text> 9 радиус стены</Text>
                  <Text>{element.data.radiusElement}</Text>
                </View>
              )}
              <ButtonCustom textBtn="Редактировать" onPress={onClickEdit} />
              <ButtonCustom textBtn="Удалить" onPress={onDeleteElement} />
              <ButtonCustom textBtn="Закрыть" onPress={onClickModalClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
});
