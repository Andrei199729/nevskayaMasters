import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path, Text as TextSvg} from 'react-native-svg';
import DrawModalWall from '../DrawModalWall/DrawModalWall';

export default function DrawElement({
  id,
  drawing,
  isLast,
  onClickLine,
  selectedLine,
  isStyleLine,
  openFormDataSize,
  setStrokeDasharrays,
  strokeDasharrays,
  numberWall,
}: any) {
  const [lineStrokeDasharrays, setLineStrokeDasharrays] = useState('10');

  const stateColorLineDraw = (index: number | null) =>
    selectedLine === index ? 'black' : 'red';

  // При первом рендере все линии будут пунктирными

  // Обновляем все линии, если данные заполнены
  useEffect(() => {
    if (openFormDataSize && numberWall !== undefined) {
      setStrokeDasharrays((prev: any) => ({
        ...prev,
        [numberWall - 1]: '0', // Делаем текущую линию пунктирной
      }));
    }
  }, [openFormDataSize, numberWall]);

  return (
    <Pressable style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        {/* Рендер всех линий */}
        {drawing?.shapes?.map((line: any, idx: number) => {
          const pathParts = line.path.split(' ');
          const startCoords = pathParts[0].slice(1).split(',');
          const endCoords = pathParts[pathParts.length - 1].slice(1).split(',');

          const startX = parseFloat(startCoords[0]);
          const startY = parseFloat(startCoords[1]);
          const endX = parseFloat(endCoords[0]);
          const endY = parseFloat(endCoords[1]);

          // Определяем позицию текста (примерно в середине линии)
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;

          return (
            <React.Fragment key={idx}>
              <G key={idx} onPressIn={() => onClickLine(idx)}>
                <Path
                  d={line.path}
                  stroke={selectedLine === idx ? 'red' : 'black'}
                  strokeWidth={4}
                  fill="none"
                  strokeDasharray={
                    strokeDasharrays[idx] ||
                    (!isStyleLine && lineStrokeDasharrays)
                  } // Используем состояние для strokeDasharray
                />
                {!isLast(idx, drawing?.shapes) && (
                  <TextSvg
                    x={midX}
                    y={midY - 5}
                    fontSize="14"
                    fill="blue"
                    textAnchor="middle">
                    {line.id}
                  </TextSvg>
                )}
              </G>
            </React.Fragment>
          );
        })}
      </Svg>
    </Pressable>
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
