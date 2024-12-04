import {Modal, View, Pressable, Text, StyleSheet} from 'react-native';
import {IDataElementsWall, IModalWall} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {useEffect, useState} from 'react';
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
  setModalVisibleWall,
  onSaveElementSize,
  elementEdit,
  ...props
}: IModalWall & any) {
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

    setElementsData(updatedElements); // Обновляем состояние
    setIsVisibleEditModal(false); // Закрываем модальное окно редактирования
  };

  const onClickEdit = () => {
    setDataEditElement({
      nameElementWall: nameElement,
      locationElementTop: element?.locationElementTop || '',
      locationElementRight: element?.locationElementRight || '',
      locationElementLeft: element?.locationElementLeft || '',
      locationElementBottom: element?.locationElementBottom || '',
      widthTop: element?.widthTop || '',
      widthBottom: element?.widthBottom || '',
      heightLeft: element?.heightLeft || '',
      heightRight: element?.heightRight || '',
      radiusElement: element?.radiusElement || '',
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
              {element?.locationElementTop !== '' && (
                <View>
                  <Text> 1 расположение сверху</Text>
                  <Text>{element?.locationElementTop}</Text>
                </View>
              )}
              {element?.locationElementBottom !== '' && (
                <View>
                  <Text> 2 расположение снизу</Text>
                  <Text>{element?.locationElementBottom}</Text>
                </View>
              )}
              {element?.locationElementRight !== '' && (
                <View>
                  <Text> 3 расположение справа</Text>
                  <Text>{element?.locationElementRight}</Text>
                </View>
              )}
              {element?.locationElementLeft !== '' && (
                <View>
                  <Text> 4 расположение слева</Text>
                  <Text>{element?.locationElementLeft}</Text>
                </View>
              )}
              {element?.widthTop !== '' && (
                <View>
                  <Text> 5 размер стены сверху</Text>
                  <Text>{element?.widthTop}</Text>
                </View>
              )}
              {element?.widthBottom !== '' && (
                <View>
                  <Text> 6 размер стены снизу</Text>
                  <Text>{element?.widthBottom}</Text>
                </View>
              )}
              {element?.heightRight !== '' && (
                <View>
                  <Text> 7 размер стены справа</Text>
                  <Text>{element?.heightRight}</Text>
                </View>
              )}
              {element?.heightLeft !== '' && (
                <View>
                  <Text> 8 размер стены слева</Text>
                  <Text>{element?.heightLeft}</Text>
                </View>
              )}
              {element?.radiusElement !== '' && (
                <View>
                  <Text> 9 радиус стены</Text>
                  <Text>{element?.radiusElement}</Text>
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
