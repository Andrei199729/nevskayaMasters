import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path, Text as TextSvg} from 'react-native-svg';
import DrawModalWall from '../DrawModalWall/DrawModalWall';

export default function DrawElement({
  id,
  drawing,
  drawModalVisible,
  setDrawModalVisible,
  setSelectedLineIndex,
  arrElements,
  setArrElements,
  setSizeWalls,
  selectedLineIndex,
  numberWall,
  setNumberCurrentWall,
  numberCurrentWall,
  isLast,
  modalVisibleBacklight,
}: any) {
  const handleLinePress = (numberCurrentWall: number) => {
    setSelectedLineIndex(id); // Устанавливаем ID выбранной стены
    setDrawModalVisible(true); // Открываем модалку
    setNumberCurrentWall(numberCurrentWall);
  };

  const stateColorVisibleModal = drawModalVisible ? 'blue' : 'black';

  return (
    <>
      {drawModalVisible && (
        <DrawModalWall
          drawModalVisible={drawModalVisible}
          setDrawModalVisible={setDrawModalVisible}
          drawing={drawing}
          id={id}
          setArrElements={setArrElements}
          arrElements={arrElements}
          setSizeWalls={setSizeWalls}
          selectedLineIndex={selectedLineIndex}
          numberCurrentWall={numberCurrentWall}
          isLast={isLast}
        />
      )}
      <Pressable
        style={styles.container}
        onPress={() => handleLinePress(numberWall)}>
        <Svg style={StyleSheet.absoluteFill}>
          {/* Рендер всех линий */}
          {drawing?.shapes?.map((line: any, idx: number) => {
            const pathParts = line.path.split(' ');
            const startCoords = pathParts[0].slice(1).split(',');
            const endCoords = pathParts[pathParts.length - 1]
              .slice(1)
              .split(',');

            const startX = parseFloat(startCoords[0]);
            const startY = parseFloat(startCoords[1]);
            const endX = parseFloat(endCoords[0]);
            const endY = parseFloat(endCoords[1]);

            // Определяем позицию текста (примерно в середине линии)
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            return (
              <React.Fragment key={idx}>
                <Path
                  d={line.path}
                  stroke={stateColorVisibleModal}
                  strokeWidth={4}
                  fill="none"
                />
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
          })}
        </Svg>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },

  savedDrawing: {
    width: '100%',
    height: 400,
  },
});
