import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../../../shared/tokens';
import ButtonHeader from '../../../shared/ButtonHeader/ButtonHeader';
import {useState} from 'react';
import Search from '../../../assets/images/icon/iconFunc/search';
import FilterIcon from '../../../assets/images/icon/iconFunc/filter-icon';
import ProfileIcon from '../../../assets/images/icon/iconFunc/profile-icon';

interface IButtonState {
  icon: JSX.Element; // Элемент JSX для иконки
  state: boolean; // Состояние кнопки (активна/неактивна)
}

export default function Header() {
  const [buttonActive, setButtonActive] = useState<Array<IButtonState>>([
    {icon: <Search />, state: false},
    {icon: <FilterIcon />, state: false},
    {icon: <ProfileIcon />, state: false},
  ]);
  const onClickBtnHeader = (index: number) => {
    const newActiveButtons = buttonActive.map((active, i) => ({
      ...active,
      state: i === index ? !active.state : false,
    }));
    setButtonActive(newActiveButtons);
  };
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Логотип</Text>
      </View>
      <View style={styles.blockButtonsHeader}>
        {buttonActive.map((active, index) => (
          <ButtonHeader
            key={index}
            onPressClick={() => onClickBtnHeader(index)}
            icon={active.icon}
            // Передаем состояние кнопки, чтобы изменить стиль
            isActive={active.state}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.almostWhite,
  },
  logo: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.r20,
  },
  logoText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
  },
  blockButtonsHeader: {
    flexDirection: 'row',
    gap: Gaps.g6,
  },
});
