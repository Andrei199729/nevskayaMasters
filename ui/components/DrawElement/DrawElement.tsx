import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import DrawModalWall from '../DrawModalWall/DrawModalWall';

export default function DrawElement({
  id,
  handleLinePress,
  drawing,
  drawModalVisible,
  setDrawModalVisible,
  setSelectedLineIndex,
  ...props
}: any) {
  const handleLinePresss = () => {
    setSelectedLineIndex(id); // Устанавливаем ID выбранной стены
    setDrawModalVisible(true); // Открываем модалку
  };
  return (
    <>
      <DrawModalWall
        drawModalVisible={drawModalVisible}
        setDrawModalVisible={setDrawModalVisible}
        drawing={drawing}
        id={id}
      />
      <>
        <Text>Стена №{id + 1}</Text>
        <TapGestureHandler
          key={id}
          onHandlerStateChange={handleLinePresss} // Обрабатываем клик
        >
          <Svg key={id} style={styles.savedDrawing}>
            {drawing.shapes.map(
              (line: {path: string | undefined}, idx: number) => (
                <Path
                  key={idx}
                  d={line.path}
                  stroke={drawModalVisible ? 'blue' : 'black'}
                  strokeWidth={4}
                  fill="none"
                />
              ),
            )}
          </Svg>
        </TapGestureHandler>
      </>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedDrawing: {
    width: '100%',
    height: 400,
    marginVertical: 10,
  },
});
