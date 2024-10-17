import {Pressable, StyleSheet, Text, View} from 'react-native';
import MainScreen from './MainScreen';
import HeaderScreen from './HeaderScreen';
import {ReactNode} from 'react';
import {Colors, Gaps, Radius} from '../../shared/tokens';
import Close from '../../assets/images/icon/iconFunc/CloseIcon';
import Title from '../../shared/Title/Title';
import {PathScreenHeader} from '../../shared/types';

interface IPopupScreen {
  children: ReactNode;
  mainTitle: string;
  path?: string;
  closePopup?: () => void;
}

export default function PopupScreen({children, ...props}: IPopupScreen) {
  return (
    <HeaderScreen>
      <MainScreen path={props.path}>
        <View
          style={{
            ...styles.containerPopup,
            flex: props.path === PathScreenHeader.Search ? 1 : 0,
          }}>
          <View style={styles.titlePopup}>
            <Title title={props.mainTitle} />
            <Pressable {...props} onPress={props.closePopup}>
              <Close />
            </Pressable>
          </View>
          {children}
        </View>
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
    gap: Gaps.g18,
  },
  titlePopup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
