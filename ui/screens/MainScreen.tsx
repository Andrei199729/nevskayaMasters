import {ReactNode, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Title from '../../shared/Title/Title';
import {Colors, Gaps} from '../../shared/tokens';
import Tomorrow from '../../assets/images/icon/iconFunc/tomorrow';
import NotProcessed from '../../assets/images/icon/iconFunc/not-processed';
import CreateTask from '../../assets/images/icon/iconFunc/createTask';
import ButtonMenuBottom from '../../shared/ButtonMenuBottom/ButtonMenuBottom';

interface IMainScreen {
  children: ReactNode;
  mainTitle: string;
}

interface IMenuBottomState {
  icon: JSX.Element;
  state: boolean;
  text: string | null;
  btn: string | null;
}

function MainScreen({children, ...props}: IMainScreen) {
  const [buttonActive, setButtonActive] = useState<Array<IMenuBottomState>>([
    {
      icon: <NotProcessed />,
      state: false,
      text: 'Не обработанные',
      btn: null,
    },
    {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
    {icon: <CreateTask />, state: false, text: null, btn: 'plus'},
    {
      icon: <NotProcessed />,
      state: false,
      text: 'Не обработанные',
      btn: null,
    },
    {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
  ]);
  const onClickBtnHeader = (index: number) => {
    const newActiveButtons = buttonActive.map((active, i) => ({
      ...active,
      state: i === index ? !active.state : false,
    }));
    setButtonActive(newActiveButtons);
  };
  return (
    <View style={{position: 'relative'}}>
      <View style={styles.mainContainer}>
        <Title title={props.mainTitle} />
        {children}
      </View>
      <View style={styles.menuBottom}>
        {buttonActive.map((active, index) => (
          <ButtonMenuBottom
            key={index}
            onPressClick={() => onClickBtnHeader(index)}
            icon={active.icon}
            text={active.text}
            isActive={active.state}
            btn={active.btn}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  menuBottom: {
    position: 'absolute',
    bottom: 0,
    maxWidth: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.menuBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

export default MainScreen;
