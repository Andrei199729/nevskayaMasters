import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
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
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';

export default function Draw({
  setSizeWalls,
  onSaveSizeWall,
  sizeWalls,
  setNumberCurrentWall,
  numberCurrentWall,
  setModalVisibleBacklight,
  modalVisibleBacklight,
  setEdit,
  editEl,
}: any) {
  const [drawModalVisible, setDrawModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openFormDataSize, setOpenFormDataSize] = useState(false);
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
  const [clickLineDraw, setClickLineDraw] = useState(false); // клик на линию
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const [indexLineWallDraw, setIndexLineWallDraw] = useState(0); // клик на линию
  const [isStyleLine, setIsStyleLine] = useState(false); // клик на линию
  const [strokeDasharrays, setStrokeDasharrays] = useState<{
    [key: number]: string;
  }>({});
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
    if (isNaN(x) || isNaN(y)) {
      console.warn('Invalid coordinates: x and y must be numbers');
      return; // Прерываем выполнение, если координаты некорректны
    }
    let adjustedPoint = {x, y}; // Точка для добавления.

    if (lastPoint && isNearPoint(lastPoint, {x, y})) {
      // Привязываем к последней точке, если пользователь рядом
      adjustedPoint = lastPoint;
    }
    if (lastPoint) {
      setCurrentPath((prev: string) => {
        const newPath = `${prev} L${Math.round(adjustedPoint.x)},${Math.round(
          adjustedPoint.y,
        )}`;
        return newPath;
      }); // Добавляем точку в текущий путь.
    } else {
      // Если это первая точка новой линии, проверяем привязку
      const startPoint =
        points.length > 0 && isNearPoint(points[points.length - 1], {x, y})
          ? points[points.length - 1]
          : adjustedPoint;
      if (isNaN(startPoint.x) || isNaN(startPoint.y)) {
        return;
      }
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
      const startX = Math.round(parseFloat(firstCoords[0]));
      const startY = Math.round(parseFloat(firstCoords[1]));
      const endX = Math.round(parseFloat(lastCoords[0]));
      const endY = Math.round(parseFloat(lastCoords[1]));

      if (!isNaN(endX) && !isNaN(endY) && lastPoint) {
        const newLength = Math.round(
          calculateLength(lastPoint, {x: endX, y: endY}),
        );

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
        // addLineToLastRoom(startX, startY, endX, endY);
      }
    }

    setCurrentPath('');
    setLastPoint(null);
  };

  const addLineToLastRoom = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => {
    // Получаем текущие координаты линии

    const newPath = `M${startX},${startY} L${endX},${endY}`;
    const pathExists = paths.some(path => path.path === newPath); // Проверяем, существует ли такой путь

    if (!isNaN(endX) && !isNaN(endY) && lastPoint) {
      const newLength = calculateLength(lastPoint, {x: endX, y: endY});
      // Находим последнюю комнату
      setPaths((prevRooms: any) => {
        const lastRoom = prevRooms[prevRooms.length - 1];
        if (!pathExists) {
          const updatedRoom = {
            ...lastRoom,
            path: [...lastRoom.path, newPath], // Добавляем новую линию в комнату
          };
          return [...prevRooms.slice(0, -1), updatedRoom]; // Обновляем последнюю комнату
        }

        return prevRooms;
      });
      if (!pathExists) {
        setPaths([...paths, {path: newPath, length: newLength}]); // Добавляем новый путь, если его еще нет в paths
        setPoints([...points, {x: startX, y: startY}, {x: endX, y: endY}]); // Обновляем точки
      }
    }
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
    if (!size) {
      console.warn('Нет данных для сохранения размера стены');
      return;
    }

    setWallsData(prevWalls => {
      const updatedWalls = prevWalls.map(wall =>
        wall.numberWall === numberWall - 1 ? {...wall, size} : wall,
      );

      return prevWalls.some(wall => wall.numberWall === numberWall - 1)
        ? updatedWalls
        : [...prevWalls, {size, numberWall: numberWall - 1}];
    });

    setIsStyleLine(true);
    if (openFormDataSize) setIsStyleLine(false);
    updateStrokeDasharray(numberWall - 1);
  };

  const onClickLine = (index: number) => {
    setClickLineDraw(!clickLineDraw);
    setSelectedLine(prev => (prev === index ? null : index));
    setIndexLineWallDraw(index);
  };

  const [dataEditWall, setDataEditWall] = useState({});
  const [isEditing, setIsEditing] = useState(false); //состояние для редактирования

  const onClickEditDataWall = (size: any, currentWall: any) => {
    if (!size) {
      return [];
    } else {
      setDataEditWall(size);
    }
  };

  const onClickWallIncrease = (size: any, wallIndex: any, click: any) => {
    switch (click) {
      case 'wall':
        // Логика, если клик был сделан на стену
        setNumberCurrentWall(wallIndex);
        onClickLine(wallIndex);

        // setIsDataFilled(!isDataFilled);
        setIsEditing(false);

        if (size) {
          setModalVisible(true);
          setModalVisibleBacklight(false);
          setOpenFormDataSize(false);
        } else {
          setModalVisible(false);
          setModalVisibleBacklight(true);
          setOpenFormDataSize(true);
        }

        break;

      case 'button':
        // Логика, если клик был сделан на кнопку
        setNumberCurrentWall(wallIndex);
        setIsEditing(true); // Можно выполнять какие-то другие действия для кнопки
        onClickEditDataWall(size, wallIndex);

        setModalVisible(false);
        setModalVisibleBacklight(true);
        setOpenFormDataSize(true);

        break;

      default:
        // Логика по умолчанию (если нужно обработать другие случаи)
        break;
    }
  };
  //
  // Функция для обновления состояния strokeDasharray
  const updateStrokeDasharray = (index: number) => {
    setStrokeDasharrays(prev => {
      const newDasharray = prev[index] === '0' ? '10' : '0'; // Пример: переключаем между '10' и '0'
      console.log(newDasharray, 'newDasharray');

      return {...prev, [index]: newDasharray};
    });
  };

  useEffect(() => {
    // Обновляем количество линий для последнего рисунка
    if (sizeWalls.length > 0) {
      const lastDrawing = sizeWalls[sizeWalls.length - 1];
      setCountWallDraw(lastDrawing?.drawingData?.shapes?.length - 1);
    }
  }, [sizeWalls]);

  useEffect(() => {
    if (wallsData.length === 0) return;

    setSizeWalls((prevSizeWalls: any[]) => {
      const updatedWalls = prevSizeWalls.map((drawing: any, index: number) => {
        if (index === prevSizeWalls.length - 1) {
          return {
            ...drawing,
            drawingData: {
              ...drawing.drawingData,
              walls: [...wallsData], // Синхронизируем wallsData с drawingData
            },
          };
        }
        return drawing;
      });

      return updatedWalls;
    });
  }, [wallsData]); // Срабатывает, когда изменяется wallsData

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

              const safeStartX = isNaN(startX) ? 0 : startX;
              const safeStartY = isNaN(startY) ? 0 : startY;
              const safeEndX = isNaN(endX) ? 0 : endX;
              const safeEndY = isNaN(endY) ? 0 : endY;

              const midX = (safeStartX + safeEndX) / 2;
              const midY = (safeStartY + safeEndY) / 2;

              // Определяем позицию текста (примерно в середине линии)
              // Проверяем, является ли текущая линия последней

              return (
                <React.Fragment key={index}>
                  <Path
                    d={line.path}
                    stroke="black"
                    strokeWidth={4}
                    fill="none"
                    strokeDasharray="10"
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
                strokeDasharray="10"
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

        {Array.isArray(sizeWalls) && sizeWalls.length > 0 ? (
          sizeWalls?.map((drawing: any, index: number | null) => {
            console.log(drawing?.drawingData?.walls, 'drawing?.drawingData');

            return (
              <DrawElement
                key={index}
                id={index}
                numberWall={index}
                drawing={drawing?.drawingData}
                setDrawModalVisible={setDrawModalVisible}
                drawModalVisible={
                  drawModalVisible && selectedLineIndex === index
                }
                setSelectedLineIndex={setSelectedLineIndex}
                setSizeWalls={setSizeWalls}
                selectedLineIndex={selectedLineIndex}
                setNumberCurrentWall={setNumberCurrentWall}
                numberCurrentWall={numberCurrentWall}
                isLast={isLast}
                setCountWallDraw={() =>
                  setCountWallDraw(drawing?.drawingData?.shapes.length)
                }
                modalVisibleBacklight={modalVisibleBacklight}
                setClickLineDraw={setClickLineDraw}
                clickLineDraw={clickLineDraw}
                onClickLine={onClickLine}
                selectedLine={selectedLine}
                isStyleLine={isStyleLine}
                openFormDataSize={openFormDataSize}
                setStrokeDasharrays={setStrokeDasharrays}
                strokeDasharrays={strokeDasharrays}
              />
            );
          })
        ) : (
          <Text>No walls to display</Text> // Если массив пуст
        )}
        <FlatList
          horizontal
          data={Array.from({length: countWallDraw}, (_, index) => index)}
          keyExtractor={item => item.toString()}
          renderItem={({item: index}) => {
            const currentWall = index === numberCurrentWall;

            return (
              <View style={{flexDirection: 'column', gap: 5}}>
                {wallsData[index] && (
                  <Text>Редактировать стену №{index + 1}</Text>
                )}
                <AddBlockDimensions
                  key={index}
                  numberWall={index + 1}
                  setSizeWalls={setSizeWalls}
                  setNumberCurrentWall={setNumberCurrentWall}
                  numberCurrentWall={numberCurrentWall}
                  setModalVisibleBacklight={setModalVisibleBacklight}
                  modalVisibleBacklight={modalVisibleBacklight && currentWall}
                  saveSizeWall={wallsData || {}}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible && currentWall}
                  setClickLineDraw={setClickLineDraw}
                  clickLineDraw={clickLineDraw && index === indexLineWallDraw}
                  onClickLine={onClickLine}
                  onClickEditDataWall={onClickEditDataWall}
                  onClickWallIncrease={onClickWallIncrease}
                  setEdit={setEdit}
                  editEl={editEl}
                  sizeWalls={sizeWalls}
                />
                {wallsData[index]?.size && (
                  <ButtonCustom
                    textBtn="Редактировать стену"
                    onPress={() =>
                      onClickWallIncrease(
                        wallsData[index]?.size,
                        index,
                        'button',
                      )
                    }
                  />
                )}
              </View>
            );
          }}
        />
        {openFormDataSize && (
          <AddSizeWall
            numberWall={numberCurrentWall + 1}
            onSaveSizeWall={handleSaveWallSize}
            dataEditWall={dataEditWall}
            setDataEditWall={setDataEditWall}
            setModalVisibleBacklight={setModalVisibleBacklight}
            setOpenFormDataSize={setOpenFormDataSize}
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
