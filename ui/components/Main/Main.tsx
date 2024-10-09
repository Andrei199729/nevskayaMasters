import {StyleSheet, Text} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import ObjectApplication from '../../../shared/ObjectApplication/ObjectApplication';
import {ObjectStatus} from '../../../shared/types';
import HeaderScreen from '../../screens/HeaderScreen';

function Main() {
  const arrObjectApplication = [
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Running},
    {status: ObjectStatus.Completed},
    {status: ObjectStatus.Created},
  ];
  return (
    <HeaderScreen>
      <MainScreen mainTitle="Объекты" path="main">
        {arrObjectApplication.map((item, index) => {
          return <ObjectApplication key={index} status={item.status} />;
        })}
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({});

export default Main;
