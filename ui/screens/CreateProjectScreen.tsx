import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import ObjectApplication from '../../shared/ObjectApplication/ObjectApplication';
import {ObjectStatus} from '../../shared/types';
import {Colors, Gaps, Radius} from '../../shared/tokens';
import Square from '../components/Square/Square';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {useEffect, useState} from 'react';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';

export default function CreateProjectScreen() {
  const array = Array.from({length: 9}).fill(0);
  const {width} = Dimensions.get('window');
  const squareSize = (width - 50) / 3;
  const [addDimensions, setAddDimensions] = useState<JSX.Element[]>([]);
  const [addSizeWall, setAddSizeWall] = useState<JSX.Element[]>([]);
  const [sizeWall, setSizeWall] = useState([]);

  const onSaveSizeWall = (currentSizeWall: any) => {
    if (currentSizeWall) {
      setAddDimensions(prev => [
        ...prev,
        <AddBlockDimensions
          key={Date.now()}
          numberWall={prev.length + 1}
          saveSizeWall={currentSizeWall}
        />,
      ]);
    }
  };

  const onAddWall = () => {
    if (sizeWall) {
      setAddSizeWall(prev => [
        ...prev,
        <AddSizeWall
          key={Date.now()}
          numberWall={prev.length + 1}
          setSizeWall={setSizeWall}
          onSaveSizeWall={onSaveSizeWall}
        />,
      ]);
    }
  };

  return (
    <HeaderScreen>
      <MainScreen>
        <ObjectApplication status={ObjectStatus.Created} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.containerWall}>{addDimensions}</View>
        </ScrollView>
        <View>
          {addSizeWall}
          <ButtonCustom
            textBtn="Добавить стену"
            disabledState={false}
            onPress={onAddWall}
          />
        </View>
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
  containerWall: {
    maxWidth: '100%',
    width: '100%',
    gap: 10,

    flexDirection: 'row',
  },
  addedContainerWall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
