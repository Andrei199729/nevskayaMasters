import {StyleSheet, Text, View} from 'react-native';
import MainScreen from './MainScreen';
import HeaderScreen from './HeaderScreen';
import {ReactNode} from 'react';
import {Colors, Radius} from '../../shared/tokens';

interface IPopupScreen {
  children: ReactNode;
  mainTitle: string;
  path?: string;
}

export default function PopupScreen({children, ...props}: IPopupScreen) {
  return (
    <HeaderScreen>
      <MainScreen mainTitle={props.mainTitle} path={props.path}>
        <View style={styles.containerPopup}>{children}</View>
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  containerPopup: {
    padding: 18,
    backgroundColor: Colors.lightGrayFive,
    borderRadius: Radius.r8,
    zIndex: -1,
  },
});
