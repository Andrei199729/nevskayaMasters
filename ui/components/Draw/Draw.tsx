import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Svg, {Path, Circle, Text as TextSvg} from 'react-native-svg';
import DrawElement from '../DrawElement/DrawElement';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import IndexWallContext from '../../../context/IndexWallContext/IndexWallContext';

export default function Draw({
  setArrElements,
  arrElements,
  setSizeWalls,
  onSaveSizeWall,
  sizeWalls,
  setNumberCurrentWall,
  numberCurrentWall,
  setModalVisibleBacklight,
  modalVisibleBacklight,
}: any) {
  const [drawModalVisible, setDrawModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Хранит массив объектов, каждый из которых представляет путь (path) и его длину.
  const [paths, setPaths] = useState<{path: string; length: number}[]>([]);
  // массив стен
  // const [savedDrawing, setSavedDrawing] = useState<any[]>([]);

  // Хранит текущий путь, который пользователь рисует.
  const [currentPath, setCurrentPath] = useState<string>('');
  // Сохраняет последнюю точку, чтобы реализовать привязку при близком расположении.
  const [lastPoint, setLastPoint] = useState<{x: number; y: number} | null>(
    null,
  );
  // Хранит все точки, используемые для вычислений, включая углы.
  const [points, setPoints] = useState<{x: number; y: number}[]>([]);
  // Хранит углы между линиями для отображения дополнительной информации.
  const [angles, setAngles] = useState<number[]>([]); // Массив углов между линиями
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(
    null,
  ); // Выбранная линия
  const [countWallDraw, setCountWallDraw] = useState(0); // Количество стен
  const [wallsData, setWallsData] = useState<any[]>([]); // который будет хранить все AddBlockDimensions

  // Пороговое значение расстояния для автоматической привязки точек.
  const DISTANCE_THRESHOLD = 20; // Порог для автоматического соединения
  // Функция вычисляет длину линии между двумя точками по формуле расстояния.
  const calculateLength = (
    p1: {x: number; y: number},
    p2: {x: number; y: number},
  ) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  // Проверка на близость двух точек
  // Проверяет, находятся ли две точки на расстоянии меньше DISTANCE_THRESHOLD
  const isNearPoint = (
    point1: {x: number; y: number},
    point2: {x: number; y: number},
  ) => {
    const distance = calculateLength(point1, point2);
    return distance <= DISTANCE_THRESHOLD;
  };
  // Функция для вычисления угла между тремя точками
  // Вычисляет угол между тремя точками с использованием скалярного произведения.
  const calculateAngle = (
    p1: {x: number; y: number},
    p2: {x: number; y: number},
    p3: {x: number; y: number},
  ) => {
    if (!p1 || !p2 || !p3) {
      return 0; // Возвращаем 0, если хотя бы одна точка отсутствует
    }
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;

    const dotProduct = v1x * v2x + v1y * v2y;
    const magnitudeV1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const magnitudeV2 = Math.sqrt(v2x * v2x + v2y * v2y);

    if (magnitudeV1 === 0 || magnitudeV2 === 0) return 0;

    const angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
    return angle * (180 / Math.PI);
  };
  // Обработчик события при движении пальца
  const onGestureEvent = (event: any) => {
    const {x, y} = event.nativeEvent; // Получаем координаты текущего жеста.
    let adjustedPoint = {x, y}; // Точка для добавления.

    if (lastPoint && isNearPoint(lastPoint, {x, y})) {
      // Привязываем к последней точке, если пользователь рядом
      adjustedPoint = lastPoint;
    }

    if (lastPoint) {
      setCurrentPath(
        (prev: string) => `${prev} L${adjustedPoint.x},${adjustedPoint.y}`,
      ); // Добавляем точку в текущий путь.
    } else {
      // Если это первая точка новой линии, проверяем привязку
      const startPoint =
        points.length > 0 && isNearPoint(points[points.length - 1], {x, y})
          ? points[points.length - 1]
          : adjustedPoint;

      setCurrentPath(`M${startPoint.x},${startPoint.y}`); // Начало нового пути.
      setLastPoint(startPoint); // Устанавливаем первую точку.
    }
  };
  // Обработчик события завершения жеста (отпускание пальца)
  // Проверяет возможность замыкания линии и добавляет новый путь.

  const onGestureEnd = () => {
    if (currentPath) {
      const pathParts = currentPath.split(' ');
      const firstCoords = pathParts[0].slice(1).split(',');
      const lastCoords = pathParts[pathParts.length - 1].slice(1).split(',');
      const startX = parseFloat(firstCoords[0]);
      const startY = parseFloat(firstCoords[1]);
      const endX = parseFloat(lastCoords[0]);
      const endY = parseFloat(lastCoords[1]);

      if (!isNaN(endX) && !isNaN(endY) && lastPoint) {
        const newLength = calculateLength(lastPoint, {x: endX, y: endY});

        // Проверка, добавляем ли мы новый путь
        const newPath = `M${startX},${startY} L${endX},${endY}`;
        const pathExists = paths.some(path => path.path === newPath); // Проверяем, существует ли такой путь

        if (!pathExists) {
          setPaths([...paths, {path: newPath, length: newLength}]); // Добавляем новый путь, если его еще нет в paths
          setPoints([...points, {x: startX, y: startY}, {x: endX, y: endY}]); // Обновляем точки
        }

        // Проверяем замыкание линии на начальную точку первой линии
        if (points.length > 0) {
          const firstPoint = points[0]; // Начальная точка первой линии

          if (isNearPoint({x: endX, y: endY}, firstPoint)) {
            // Добавляем линию, замыкающую путь
            const closingPath = `M${endX},${endY} L${firstPoint.x},${firstPoint.y}`;
            const closingPathExists = paths.some(
              path => path.path === closingPath,
            );

            if (!closingPathExists) {
              setPaths(prevPaths => [
                ...prevPaths,
                {path: closingPath, length: newLength},
              ]);
            }
          }
        }
      }
    }

    setCurrentPath('');
    setLastPoint(null);
  };

  // Показывает уведомление о сохранении.
  const saveDrawing = () => {
    setSizeWalls((prevDrawing: string | any[]) => {
      // Определяем номер стены
      const numberWall = prevDrawing.length;
      const countWallDraw = paths.length;
      // Строим структуру для сохранения
      const drawingData = {
        numberWall,
        countWallDraw,
        shapes: paths.map((path, index) => ({
          id: index + 1,
          path: path.path, // Путь
          length: path.length, // Длина линии
          points: points, // Все точки на рисунке
        })),
        walls: wallsData,
      };

      // Обновляем состояние и передаём в `onSaveSizeWall`
      const newDrawing = [...prevDrawing, {drawingData}];
      return newDrawing;
    });

    setCountWallDraw(countWallDraw);
    // Очистка путей после сохранения
    setPaths([]);
  };
  const isLast = (index: number, paths: any) => index === paths.length - 1;
  const handleSaveWallSize = (size: any, numberWall: number) => {
    if (size) {
      setWallsData(prevWalls => [
        ...prevWalls,
        {size, numberWall: numberWall - 1},
      ]);
    }
  };

  useEffect(() => {
    // Обновляем количество линий для последнего рисунка
    if (sizeWalls.length > 0) {
      const lastDrawing = sizeWalls[sizeWalls.length - 1];
      setCountWallDraw(lastDrawing?.drawingData?.shapes?.length - 1);
    }
  }, [sizeWalls]);
  useEffect(() => {
    setSizeWalls((prevSizeWalls: any[]) => {
      if (wallsData.length === 0) return prevSizeWalls;
      return prevSizeWalls.map((drawing: {drawingData: any}, index: number) => {
        if (index === prevSizeWalls.length - 1) {
          return {
            ...drawing,
            drawingData: {...drawing.drawingData, walls: wallsData},
          };
        }
        return drawing;
      });
    });
  }, [wallsData]);
  return (
    <View style={styles.container}>
      <Button title="Сохранить рисунок" onPress={saveDrawing} />

      <GestureHandlerRootView style={styles.drawingArea}>
        <View style={styles.drawingContainer}>
          <Svg style={StyleSheet.absoluteFill}>
            {/* Рендер всех линий */}
            {paths.map((line, index) => {
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
              // Проверяем, является ли текущая линия последней
              return (
                <React.Fragment key={index}>
                  <Path
                    d={line.path}
                    stroke="black"
                    strokeWidth={4}
                    fill="none"
                  />
                  {/* Вывод длины линии рядом с ней */}

                  {!isLast(index, paths) && (
                    <TextSvg
                      x={midX - 10}
                      y={midY - 5}
                      fontSize="14"
                      fill="blue"
                      textAnchor="middle">
                      {index + 1}
                    </TextSvg>
                  )}
                </React.Fragment>
              );
            })}

            {/* Рендер текущей линии */}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke="black"
                strokeWidth={4}
                fill="none"
              />
            ) : null}

            {/* Подсветка конечной точки */}
            {lastPoint && (
              <Circle cx={lastPoint.x} cy={lastPoint.y} r={5} fill="red" />
            )}
          </Svg>

          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onEnded={onGestureEnd}>
            <View style={StyleSheet.absoluteFill} />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>

      <View style={styles.infoContainer}>
        {paths.map((line, index) => (
          <View key={index}>
            <Text>
              Линия {index + 1}: Длина = {line.length.toFixed(2)} единиц
            </Text>
            {index > 0 &&
              points[index - 1] &&
              points[index] &&
              angles[index - 1] !== undefined && (
                <Text>
                  Угол с предыдущей линией ={' '}
                  {angles[index - 1] ? angles[index - 1].toFixed(2) : 'N/A'}°
                </Text>
              )}
          </View>
        ))}
      </View>
      {/* Отображение сохраненных фигур ниже */}
      <View style={styles.savedDrawingsContainer}>
        <Text>Сохраненные рисунки:</Text>

        {sizeWalls.map((drawing: any, index: number | null) => {
          return (
            <DrawElement
              key={index}
              id={index}
              numberWall={index}
              drawing={drawing?.drawingData}
              setDrawModalVisible={setDrawModalVisible}
              drawModalVisible={drawModalVisible && selectedLineIndex === index}
              setSelectedLineIndex={setSelectedLineIndex}
              setArrElements={setArrElements}
              arrElements={arrElements}
              setSizeWalls={setSizeWalls}
              selectedLineIndex={selectedLineIndex}
              setNumberCurrentWall={setNumberCurrentWall}
              numberCurrentWall={numberCurrentWall}
              isLast={isLast}
              setCountWallDraw={() =>
                setCountWallDraw(drawing?.drawingData?.shapes.length)
              }
              modalVisibleBacklight={modalVisibleBacklight}
            />
          );
        })}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {Array.from({length: countWallDraw}, (_, index) => {
            return (
              <AddBlockDimensions
                key={index}
                numberWall={index + 1}
                setArrElements={setArrElements}
                setSizeWalls={setSizeWalls}
                setNumberCurrentWall={setNumberCurrentWall}
                numberCurrentWall={numberCurrentWall}
                setModalVisibleBacklight={setModalVisibleBacklight}
                modalVisibleBacklight={
                  modalVisibleBacklight && index === numberCurrentWall
                }
                saveSizeWall={wallsData || {}}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible && index === numberCurrentWall}
              />
            );
          })}
        </ScrollView>
        {modalVisibleBacklight && (
          <AddSizeWall
            numberWall={numberCurrentWall + 1}
            onSaveSizeWall={handleSaveWallSize}
            key={numberCurrentWall}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  drawingArea: {
    flex: 1,
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
  },
  drawingContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },
  infoContainer: {
    marginTop: 20,
  },
  savedDrawingsContainer: {
    marginTop: 20,
    width: '100%',
  },
  savedDrawing: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  contentContainer: {
    gap: 5,
    flexGrow: 1,
  },
});
