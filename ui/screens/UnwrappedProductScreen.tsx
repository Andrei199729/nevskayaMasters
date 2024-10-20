import {StyleSheet, Text, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import HeaderScreen from './HeaderScreen';
import {
  INavigationScreenProps,
  ISelectOption,
  ObjectStatus,
} from '../../shared/types';
import MainScreen from './MainScreen';
import ObjectApplication from '../../shared/ObjectApplication/ObjectApplication';
import UnwrappedProductObject from '../../shared/UnwrappedProductObject/UnwrappedProductObject';
import Title from '../../shared/Title/Title';
import Download from '../../assets/images/icon/iconFunc/downloadIcon';
import ButtonDownload from '../../shared/ButtonDownload/ButtonDownload';
import SelectCustom from '../../shared/SelectCustom/SelectCustom';
import SelectProducts from '../../shared/SelectProducts/SelectProducts';
import {arrWs} from '../../shared/texts';

interface IUnwrappedProductScreen {
  applicationNumber?: string;
  navigation: any;
}

function UnwrappedProductScreen({
  navigation,
  ...props
}: IUnwrappedProductScreen) {
  return (
    <HeaderScreen>
      <MainScreen mainTitle={`№ ${'заявки'}`}>
        <UnwrappedProductObject status={ObjectStatus.Created} />
        <View style={styles.boxTitle}>
          <Title title="Название вида объекта" />
          <Text style={styles.subTitle}>4 этаж</Text>
        </View>
        <ButtonCustom
          textBtn="Добавить фото и размеры лифта"
          disabledState={false}
        />
        <Text style={styles.text}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
        <View style={styles.boxTitle}>
          <Title title="Изделия" />
          <SelectProducts options={arrWs} nameSelect="Санузел" />
          <Text style={styles.textProduct}>Кухня</Text>
          <Text style={styles.textProduct}>Ванная комната</Text>
        </View>
        <View style={styles.boxTitle}>
          <Title title="Файлы от менеджера" />
          <ButtonDownload
            navigationPath={undefined}
            textBtn="Полезный файл от менеджера"
          />
          <ButtonDownload
            navigationPath={undefined}
            textBtn="Полезный файл от менеджера №2"
          />
        </View>
        <View style={styles.boxTitle}>
          <Title title="Комментарий к заявке" />
          <Text style={styles.text}>
            Но современная методология разработки, а также свежий взгляд на
            привычные вещи — безусловно открывает новые горизонты для позиций,
            занимаемых участниками в отношении поставленных задач #изделие
            #изделие.2
          </Text>
          <ButtonCustom textBtn="Добавить комментарий" disabledState={false} />
        </View>
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    gap: Gaps.g12,
  },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.black,
  },
  textProduct: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
    paddingVertical: 6,
  },
});

export default UnwrappedProductScreen;
