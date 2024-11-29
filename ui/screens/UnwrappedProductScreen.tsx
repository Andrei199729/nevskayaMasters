import {Pressable, StyleSheet, Text, View} from 'react-native';
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
import ButtonAddProduct from '../../shared/ButtonAddProduct/ButtonAddProduct';
import {useNavigation} from '@react-navigation/native';

interface IUnwrappedProductScreen {
  applicationNumber?: string;
  navigation: any;
}

function UnwrappedProductScreen({
  navigation,
  route,
  ...props
}: IUnwrappedProductScreen & any) {
  const {dataProduct, nameRoom, arrElements} = route.params || {};
  console.log(arrElements, 'arrElements');

  const [productsRooms, setProductsRooms] = useState<any>([]);
  useEffect(() => {
    if (nameRoom) {
      setProductsRooms((prevProducts: any) => [
        ...prevProducts,
        {
          nameRoom: nameRoom,
          dataProduct: dataProduct,
          arrElements: arrElements,
        },
      ]);
    }
  }, [nameRoom]);
  const onClickAddProduct = () => {
    navigation.navigate('FormDataAddProduct');
  };

  const onClickLinkProduct = (productRoom: any) => {
    navigation.navigate('Product', {
      productRoom: productRoom,
    });
  };
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
          <View style={styles.boxAdd}>
            <Title title="Изделия" />
            <ButtonAddProduct onClickAddProduct={onClickAddProduct} />
          </View>
          <View style={styles.boxTitle}>
            {productsRooms?.map((productRoom: any, index: any) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => onClickLinkProduct(productRoom)}>
                  <Text style={styles.textProduct}>
                    {index + 1}
                    {productRoom.nameRoom}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
  boxAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default UnwrappedProductScreen;
