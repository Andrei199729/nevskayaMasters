import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {Path, Circle} from 'react-native-svg';

export default function Draw() {
  const [paths, setPaths] = useState<{path: string; length: number}[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [lastPoint, setLastPoint] = useState<{x: number; y: number} | null>(
    null,
  );
  const [points, setPoints] = useState<{x: number; y: number}[]>([]);
  const [angles, setAngles] = useState<number[]>([]); // Массив углов между линиями

  const DISTANCE_THRESHOLD = 20; // Порог для автоматического соединения

  const calculateLength = (
    p1: {x: number; y: number},
    p2: {x: number; y: number},
  ) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  // Проверка на близость двух точек
  const isNearPoint = (
    point1: {x: number; y: number},
    point2: {x: number; y: number},
  ) => {
    const distance = calculateLength(point1, point2);
    return distance <= DISTANCE_THRESHOLD;
  };
  // Функция для вычисления угла между тремя точками
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
    const {x, y} = event.nativeEvent;
    let adjustedPoint = {x, y};

    if (lastPoint && isNearPoint(lastPoint, {x, y})) {
      // Привязываем к последней точке, если пользователь рядом
      adjustedPoint = lastPoint;
    }

    if (lastPoint) {
      setCurrentPath(
        (prev: string) => `${prev} L${adjustedPoint.x},${adjustedPoint.y}`,
      );
    } else {
      // Если это первая точка новой линии, проверяем привязку
      const startPoint =
        points.length > 0 && isNearPoint(points[points.length - 1], {x, y})
          ? points[points.length - 1]
          : adjustedPoint;

      setCurrentPath(`M${startPoint.x},${startPoint.y}`);
      setLastPoint(startPoint);
    }
  };
  // Обработчик события завершения жеста (отпускание пальца)
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
        setPaths([...paths, {path: currentPath, length: newLength}]);
        setPoints([...points, {x: endX, y: endY}]);

        // Проверка на наличие предыдущих точек перед вычислением угла
        if (points.length >= 1) {
          const angle = calculateAngle(
            points[points.length - 2], // Первая линия
            points[points.length - 1], // Вторая линия
            {x: endX, y: endY}, // Точка конца второй линии
          );
          setAngles([...angles, angle]);
        }
      }
      // Рисуем прямую линию между начальной и конечной точкой
      const newPath = `M${startX},${startY} L${endX},${endY}`;
      const newLength = calculateLength(
        {x: startX, y: startY},
        {x: endX, y: endY},
      );
      setPaths([...paths, {path: newPath, length: newLength}]); // изменить хук название
      setPoints([...points, {x: startX, y: startY}, {x: endX, y: endY}]); // изменить хук название
    }

    setCurrentPath('');
    setLastPoint(null);
  };

  const saveDrawing = () => {
    Alert.alert('Рисунок сохранён', 'Ваш рисунок был сохранён!');
  };

  return (
    <View style={styles.container}>
      <Button title="Сохранить рисунок" onPress={saveDrawing} />

      <GestureHandlerRootView style={styles.drawingArea}>
        <View style={styles.drawingContainer}>
          <Svg style={StyleSheet.absoluteFill}>
            {/* Рендер всех линий */}
            {paths.map((line, index) => (
              <Path
                key={index}
                d={line.path}
                stroke="black"
                strokeWidth={4}
                fill="none"
              />
            ))}

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
              <Circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={5}
                fill="red" // Красный цвет для подсветки
              />
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
  },
  infoContainer: {
    marginTop: 20,
  },
});

// import React, {useState} from 'react';
// import {View, Text, Button, Alert, StyleSheet} from 'react-native';
// import {
//   PanGestureHandler,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';
// import Svg, {Path, Circle} from 'react-native-svg';

// export default function Draw() {
//   const [paths, setPaths] = useState<{path: string; length: number}[]>([]); // История путей
//   const [currentPath, setCurrentPath] = useState<string>(''); // Текущий путь
//   const [lastPoint, setLastPoint] = useState<{x: number; y: number} | null>(
//     null,
//   ); // Последняя точка
//   const [points, setPoints] = useState<{x: number; y: number}[]>([]); // Массив всех точек

//   const DISTANCE_THRESHOLD = 20; // Порог для автоматического соединения

//   // Функция для вычисления расстояния между двумя точками
//   const calculateLength = (
//     p1: {x: number; y: number},
//     p2: {x: number; y: number},
//   ) => {
//     return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
//   };

//   // Проверка на близость двух точек
//   const isNearPoint = (
//     point1: {x: number; y: number},
//     point2: {x: number; y: number},
//   ) => {
//     const distance = calculateLength(point1, point2);
//     return distance <= DISTANCE_THRESHOLD;
//   };

//   // Функция для вычисления угла между тремя точками
//   const calculateAngle = (
//     p1: {x: number; y: number},
//     p2: {x: number; y: number},
//     p3: {x: number; y: number},
//   ) => {
//     const v1x = p2.x - p1.x;
//     const v1y = p2.y - p1.y;
//     const v2x = p3.x - p2.x;
//     const v2y = p3.y - p2.y;

//     const dotProduct = v1x * v2x + v1y * v2y;
//     const magnitudeV1 = Math.sqrt(v1x * v1x + v1y * v1y);
//     const magnitudeV2 = Math.sqrt(v2x * v2x + v2y * v2y);

//     if (magnitudeV1 === 0 || magnitudeV2 === 0) return 0;

//     const angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
//     return angle * (180 / Math.PI);
//   };

//   // Обработчик события при движении пальца
//   const onGestureEvent = (event: any) => {
//     const {x, y} = event.nativeEvent;

//     let adjustedPoint = {x, y};

//     if (lastPoint && isNearPoint(lastPoint, {x, y})) {
//       // Привязываем к последней точке, если пользователь рядом
//       adjustedPoint = lastPoint;
//     }

//     if (lastPoint) {
//       // Добавляем текущую точку к пути
//       setCurrentPath(
//         (prev: string) => `${prev} L${adjustedPoint.x},${adjustedPoint.y}`,
//       );
//     } else {
//       // Начинаем новый путь с первой точки
//       setCurrentPath(`M${adjustedPoint.x},${adjustedPoint.y}`);
//     }

//     setLastPoint(adjustedPoint);
//   };

//   // Обработчик события завершения жеста (отпускание пальца)
//   const onGestureEnd = () => {
//     if (currentPath) {
//       // Получаем координаты начальной и конечной точки
//       const pathParts = currentPath.split(' ');
//       const firstCoords = pathParts[0].slice(1).split(',');
//       const lastCoords = pathParts[pathParts.length - 1].slice(1).split(',');

//       const startX = parseFloat(firstCoords[0]);
//       const startY = parseFloat(firstCoords[1]);
//       const endX = parseFloat(lastCoords[0]);
//       const endY = parseFloat(lastCoords[1]);

//       // Рисуем прямую линию между начальной и конечной точкой
//       const newPath = `M${startX},${startY} L${endX},${endY}`;
//       const newLength = calculateLength(
//         {x: startX, y: startY},
//         {x: endX, y: endY},
//       );

//       setPaths([...paths, {path: newPath, length: newLength}]);
//       setPoints([...points, {x: startX, y: startY}, {x: endX, y: endY}]);
//     }

//     setCurrentPath('');
//     setLastPoint(null);
//   };

//   // Функция сохранения рисунка
//   const saveDrawing = () => {
//     Alert.alert('Рисунок сохранён', 'Ваш рисунок был сохранён!');
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Сохранить рисунок" onPress={saveDrawing} />

//       <GestureHandlerRootView style={styles.drawingArea}>
//         <View style={styles.drawingContainer}>
//           <Svg style={StyleSheet.absoluteFill}>
//             {/* Рендер всех линий */}
//             {paths.map((line, index) => (
//               <Path
//                 key={index}
//                 d={line.path}
//                 stroke="black"
//                 strokeWidth={4}
//                 fill="none"
//               />
//             ))}

//             {/* Рендер текущей линии */}
//             {currentPath ? (
//               <Path
//                 d={currentPath}
//                 stroke="black"
//                 strokeWidth={4}
//                 fill="none"
//               />
//             ) : null}

//             {/* Подсветка конечной точки */}
//             {lastPoint && (
//               <Circle cx={lastPoint.x} cy={lastPoint.y} r={5} fill="red" />
//             )}
//           </Svg>

//           <PanGestureHandler
//             onGestureEvent={onGestureEvent}
//             onEnded={onGestureEnd}>
//             <View style={StyleSheet.absoluteFill} />
//           </PanGestureHandler>
//         </View>
//       </GestureHandlerRootView>

//       <View style={styles.infoContainer}>
//         {paths.map((line, index) => (
//           <View key={index}>
//             <Text>
//               Линия {index + 1}: Длина = {line.length.toFixed(2)} единиц
//             </Text>
//             {index > 0 && points[index - 1] && points[index] && (
//               <Text>
//                 Угол с предыдущей линией ={' '}
//                 {calculateAngle(
//                   points[index - 1],
//                   points[index],
//                   points[index + 1] || points[index],
//                 ).toFixed(2)}{' '}
//                 °
//               </Text>
//             )}
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   drawingArea: {
//     flex: 1,
//     width: '100%',
//     height: 400,
//     backgroundColor: '#f0f0f0',
//   },
//   drawingContainer: {
//     flex: 1,
//   },
//   infoContainer: {
//     marginTop: 20,
//   },
// });
