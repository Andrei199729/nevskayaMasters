import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Colors, Fonts, Gaps, Radius} from '../../../shared/tokens';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import ButtonClear from '../../../shared/ButtonClear/ButtonClear';
import SelectCustom from '../../../shared/SelectCustom/SelectCustom';
import {
  arrSelectCity,
  arrSelectCompany,
  arrSelectPay,
  arrSelectStatus,
  data,
} from '../../../shared/texts';
import CalendarElement from '../../../shared/CalendarElement/CalendarElement';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {Input} from '../../../shared/Input/Input';
import {IDataItem} from '../../../shared/types';

export default function SearchPopup() {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );

  const [selectedOption, setSelectedOption] = useState<IDataItem | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(selectedOption);

  const [isDimmed, setIsDimmed] = useState(true);
  const [isSelectActive, setIsSelectActive] = useState(true);
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const closePopup = () => {
    navigation.goBack();
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
    setIsOpen(true);
    setIsActiveBtn(false);
    setIsSelectActive(!isSelectActive);
  };

  const handleOptionSelect = (option: IDataItem) => {
    setSelectedOption(option);
    setSearchText(option.name);
    setIsOpen(false);
    setIsDimmed(false);
    setIsSelectActive(!isSelectActive);
  };
  return (
    <PopupScreen
      mainTitle="Поиск"
      closePopup={closePopup}
      path={currentRouteName}>
      <View style={styles.blockSearch}>
        <View>
          <Input
            textPlaceholder="Введите ваш запрос"
            isSearch
            value={searchText}
            onChangeText={onChangeText}
            isOpenSearch={isOpen}
            isSelectActive={isSelectActive}
          />
          {isOpen && (
            <View style={styles.selectContent}>
              <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                nestedScrollEnabled={true}
                renderItem={({item, index}) => (
                  <View>
                    <Pressable
                      onPress={() => handleOptionSelect(item)}
                      style={({pressed}) => [
                        styles.dropdownSelect,
                        {
                          backgroundColor: pressed
                            ? Colors.lightGraySeven
                            : Colors.white,
                        },
                        index === data.length - 1 && styles.lastSelect,
                      ]}>
                      <Text style={styles.textOption}>{item.name}</Text>
                    </Pressable>
                  </View>
                )}
              />
            </View>
          )}
        </View>
        <View style={styles.blockBtn}>
          <ButtonCustom
            textBtn="Найти"
            disabledState={isActiveBtn}
            style={styles.btn}
          />
        </View>
      </View>
    </PopupScreen>
  );
}

const styles = StyleSheet.create({
  blockSearch: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textOption: {
    fontSize: Fonts.f12,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  lastSelect: {
    borderBottomLeftRadius: Radius.r8,
    borderBottomRightRadius: Radius.r8,
  },
  dropdownSelect: {
    paddingVertical: 4,
    paddingLeft: 18,
  },
  btn: {
    flex: 1,
    maxWidth: '100%',
    width: '100%',
  },
  item: {},
  text: {
    fontSize: 16,
  },
  selectContent: {
    backgroundColor: Colors.white,
    marginTop: 16,
    paddingTop: 18,
    borderRadius: Radius.r8,
  },
  blockBtn: {
    marginTop: 'auto',
  },
});
