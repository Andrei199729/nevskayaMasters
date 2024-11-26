import {Modal, View, Pressable, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
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
  saveSizeWall,
  nameElementWall,
  setModalVisibleWall,
  onSaveElementSize,
  ...props
}: IModalFormElement & any) {
  const locationElementTop = useInput('');
  const locationElementRight = useInput('');
  const locationElementLeft = useInput('');
  const locationElementBottom = useInput('');
  const widthTop = useInput('');
  const widthBottom = useInput('');
  const heightLeft = useInput('');
  const heightRight = useInput('');
  const radiusElement = useInput('');

  const [dataObjectSizeElement, setObjectDataSizeElement] = useState<any>({
    nameElementWall: '',
    locationElementTop: '',
    locationElementRight: '',
    locationElementLeft: '',
    locationElementBottom: '',
    widthTop: '',
    widthBottom: '',
    heightLeft: '',
    heightRight: '',
    radiusElement: '',
  });

  const onSaveDataElement = () => {
    const updatedDataObjectSizeElement = {
      nameElementWall: nameElementWall,
      locationElementTop: locationElementTop.value,
      locationElementRight: locationElementRight.value,
      locationElementLeft: locationElementLeft.value,
      locationElementBottom: locationElementBottom.value,
      widthTop: widthTop.value,
      widthBottom: widthBottom.value,
      heightLeft: heightLeft.value,
      heightRight: heightRight.value,
      radiusElement: radiusElement.value,
    };

    setObjectDataSizeElement(updatedDataObjectSizeElement);
    onSaveElementSize(updatedDataObjectSizeElement);
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
        <Text>{nameElementWall}</Text>
        <View>
          <Text>1 расположение сверху</Text>
          <Input
            value={locationElementTop.value}
            onChangeText={locationElementTop.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>2 расположение справа</Text>
          <Input
            value={locationElementRight.value}
            onChangeText={locationElementRight.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>3 расположение снизу</Text>
          <Input
            value={locationElementBottom.value}
            onChangeText={locationElementBottom.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>4 расположение слева</Text>
          <Input
            value={locationElementLeft.value}
            onChangeText={locationElementLeft.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>5 размер элемента сверху</Text>
          <Input
            value={widthTop.value}
            onChangeText={widthTop.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>6 размер элемента справа</Text>
          <Input
            value={heightRight.value}
            onChangeText={heightRight.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>7 размер элемента снизу</Text>
          <Input
            value={widthBottom.value}
            onChangeText={widthBottom.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>8 размер элемента слева</Text>
          <Input
            value={heightLeft.value}
            onChangeText={heightLeft.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>9 радиус элемента</Text>
          <Input
            value={radiusElement.value}
            onChangeText={radiusElement.onChangeTextNotLength}
            inputModeText={'numeric'}
          />
        </View>
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataElement} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
