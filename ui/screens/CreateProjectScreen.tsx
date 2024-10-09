import {Dimensions, StyleSheet, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import ObjectApplication from '../../shared/ObjectApplication/ObjectApplication';
import {ObjectStatus} from '../../shared/types';
import {Colors, Gaps, Radius} from '../../shared/tokens';
import Square from '../components/Square/Square';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {useState} from 'react';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';

export default function CreateProjectScreen() {
  const array = Array.from({length: 9}).fill(0);
  const {width} = Dimensions.get('window');
  const squareSize = (width - 50) / 3;
  const [addDimensions, setAddDimensions] = useState<JSX.Element[]>([]);
  const onAddWall = () => {
    setAddDimensions(prev => [
      ...prev,
      <AddBlockDimensions key={prev.length} numberWall={prev.length + 1} />,
    ]);
  };

  return (
    <HeaderScreen>
      <MainScreen>
        <ObjectApplication status={ObjectStatus.Created} />
        {addDimensions}
        <ButtonCustom
          textBtn="Добавить стену"
          disabledState={false}
          onPress={onAddWall}
        />
        <View style={styles.squares}>
          {array.map((square, index) => {
            return <Square key={index} size={squareSize} />;
          })}
        </View>
        <View style={styles.drawing}></View>
        <ButtonCustom textBtn="Скачать PDF-файл" disabledState={false} />
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  drawing: {
    borderRadius: Radius.r8,
    backgroundColor: Colors.black,
    width: 'auto',
    height: 202,
  },
  squares: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Gaps.g8,
  },
});
