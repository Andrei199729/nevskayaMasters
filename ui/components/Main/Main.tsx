import {StyleSheet, Text} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import ObjectApplication from '../../../shared/ObjectApplication/ObjectApplication';
import {ObjectStatus} from '../../../shared/types';
import HeaderScreen from '../../screens/HeaderScreen';
import ButtonLinkAuth from '../../../shared/ButtonLinkAuth/ButtonLinkAuth';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

function Main() {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const arrObjectApplication = [
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Running},
    {status: ObjectStatus.Completed},
    {status: ObjectStatus.Created},
  ];
  return (
    <HeaderScreen>
      <MainScreen
        mainTitle="Объекты"
        path="main"
        pathLink="Politics"
        textBtn="Политика кофиденциальности">
        {arrObjectApplication.map((item, index) => {
          return <ObjectApplication key={index} status={item.status} />;
        })}
        <ButtonLinkAuth
          navigationPath={navigation} // navigationPath={navigation}
          textBtn="Политика кофиденциальности"
          path={'Policy'}
        />
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({});

export default Main;
