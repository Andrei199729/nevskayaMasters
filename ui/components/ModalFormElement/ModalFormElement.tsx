import {Modal, View, Pressable, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {IModalWall} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import useInput from '../../../hooks/useInput';
interface IModalFormElement extends IModalWall {
  nameElementWall: string;
}
export default function ModalFormElement({
  modalVisible,
  setModalVisible,
  numberWall,
  nameElementWall,
  setModalVisibleWall,
  onSaveElementSize,
  dataEditElement,
  ...props
}: IModalFormElement & any) {
  // const locationElementTop = useInput('');
  // const locationElementRight = useInput('');
  // const locationElementLeft = useInput('');
  // const locationElementBottom = useInput('');
  // const widthTop = useInput('');
  // const widthBottom = useInput('');
  // const heightLeft = useInput('');
  // const heightRight = useInput('');
  // const radiusElement = useInput('');

  const [heightRight, setHeightRight] = useState<string>(
    dataEditElement?.heightRight || '',
  );
  const [widthTop, setWidthTop] = useState<string>(
    dataEditElement?.widthTop || '',
  );
  const [heightLeft, setHeightLeft] = useState<string>(
    dataEditElement?.heightLeft || '',
  );
  const [widthBottom, setWidthBottom] = useState<string>(
    dataEditElement?.widthBottom || '',
  );
  const [radiusElement, setRadiusElement] = useState<string>(
    dataEditElement?.radiusElement || '',
  );

  const [locationElementTop, setLocationElementTop] = useState<string>(
    dataEditElement?.locationElementTop || '',
  );
  const [locationElementRight, setLocationElementRight] = useState<string>(
    dataEditElement?.locationElementRight || '',
  );
  const [locationElementLeft, setLocationElementLeft] = useState<string>(
    dataEditElement?.locationElementLeft || '',
  );
  const [locationElementBottom, setLocationElementBottom] = useState<string>(
    dataEditElement?.locationElementBottom || '',
  );

  useEffect(() => {
    if (dataEditElement) {
      setHeightRight(dataEditElement?.heightRight || '');
      setWidthTop(dataEditElement?.widthTop || '');
      setHeightLeft(dataEditElement?.heightLeft || '');
      setWidthBottom(dataEditElement?.widthBottom || '');
      setRadiusElement(dataEditElement?.radiusElement || '');
      setLocationElementTop(dataEditElement?.locationElementTop || '');
      setLocationElementRight(dataEditElement?.locationElementRight || '');
      setLocationElementLeft(dataEditElement?.locationElementLeft || '');
      setLocationElementBottom(dataEditElement?.locationElementBottom || '');
    }
  }, [dataEditElement]);

  const onSaveDataElement = () => {
    const updatedDataObjectSizeElement = {
      nameElementWall,
      heightRight,
      widthTop,
      widthBottom,
      heightLeft,
      radiusElement,
      locationElementTop,
      locationElementRight,
      locationElementLeft,
      locationElementBottom,
      // locationElementTop: locationElementTop.value,
      // locationElementRight: locationElementRight.value,
      // locationElementLeft: locationElementLeft.value,
      // locationElementBottom: locationElementBottom.value,
      // widthTop: widthTop.value,
      // widthBottom: widthBottom.value,
      // heightLeft: heightLeft.value,
      // heightRight: heightRight.value,
      // radiusElement: radiusElement.value,
    };

    onSaveElementSize(updatedDataObjectSizeElement, numberWall - 1);
    setModalVisible(!modalVisible);
    setModalVisibleWall(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: Colors.black,
        }}>
        <Text>
          {numberWall} {nameElementWall}
        </Text>
        <View>
          <Text>1 расположение сверху</Text>
          <Input
            value={locationElementTop}
            onChangeText={setLocationElementTop}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>2 расположение справа</Text>
          <Input
            value={locationElementRight}
            onChangeText={setLocationElementRight}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>3 расположение снизу</Text>
          <Input
            value={locationElementBottom}
            onChangeText={setLocationElementBottom}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>4 расположение слева</Text>
          <Input
            value={locationElementLeft}
            onChangeText={setLocationElementLeft}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>5 размер элемента сверху</Text>
          <Input
            value={widthTop}
            onChangeText={setWidthTop}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>6 размер элемента справа</Text>
          <Input
            value={heightRight}
            onChangeText={setHeightRight}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>7 размер элемента снизу</Text>
          <Input
            value={widthBottom}
            onChangeText={setWidthBottom}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>8 размер элемента слева</Text>
          <Input
            value={heightLeft}
            onChangeText={setHeightLeft}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>9 радиус элемента</Text>
          <Input
            value={radiusElement}
            onChangeText={setRadiusElement}
            inputModeText={'numeric'}
          />
        </View>
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataElement} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
