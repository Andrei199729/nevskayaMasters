import {NavigationProp} from '@react-navigation/native';
import {ReactNode} from 'react';

export enum ObjectStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed',
}

export enum PathScreenHeader {
  Search = 'Search',
  Filter = 'Filter',
  Profile = 'Profile',
}

export enum PathScreenAuth {
  Register = 'Register',
  Login = 'Login',
  RestorePassword = 'RestorePassword',
  Success = 'Success',
  NewPassword = 'NewPassword',
}

export enum PathScreen {
  Product = 'Product',
  UnwrappedProduct = 'UnwrappedProduct',
}

export enum StateElement {
  Ventilation = 'ventilation',
  Door = 'elementDoor',
  Window = 'elementWindow',
  Socket = 'elementSocket',
  Battery = 'elementBattery',
}

export interface IMainScreen {
  children: ReactNode;
  mainTitle?: string;
  path?: string;
  navigation?: string;
  textBtn?: string;
  pathLink?: string;
}

export interface ISelectOption {
  text: string;
  id: number;
}

export interface IDataItem {
  id: string;
  name: string;
}

export interface IWallData {
  id?: number;
  heightRight: string;
  heightLeft: string;
  widthTop: string;
  widthBottom: string;
  wallAngleDegree?: string;
  radiusWall?: string;
}

export type RootStackParamList = {
  LoginScreen: undefined;
  NewPassword: undefined;
  RegisterScreen: undefined;
  RestorePasswordScreen: undefined;
  Success: undefined;
  SuccessScreen: undefined;
  FormDataAddProduct: undefined;
  Main: undefined;
  UnwrappedProduct: {
    dataProduct: any;
    nameRoom: string;
    // arrElements: any;
  };
  Product: {productRoom: any};
};

export interface INavigationScreenProps {
  navigation: NavigationProp<RootStackParamList, keyof RootStackParamList>;
}

export interface IAddBlockDimensions {
  numberWall: number;
  saveSizeWall?: IWallData;
}

export interface IModalWall extends IAddBlockDimensions {
  modalVisible: boolean;
  setModalVisible: (item: boolean) => void;
}

export interface IDataElementsWall {
  id: number;
  nameElement: string;
  stateElement: string;
}

export interface IElementWall {
  numberElement?: number;
  data: IElementData;
  dataObj: IDataElementsWall;
}

export interface IDataContext {
  arrElements?: IElementWall[];
  setArrElements: (elements: IElementWall[]) => void;
}

export interface IElementData {
  nameElementWall: string;
  heightRight: string;
  widthTop: string;
  widthBottom: string;
  heightLeft: string;
  radiusElement: string;
  locationElementTop: string;
  locationElementRight: string;
  locationElementLeft: string;
  locationElementBottom: string;
}

export interface IDataProduct {
  currentSizeWall: IWallData;
  shapes?: any;
  arrElements?: any;
}

export interface IArrElements {
  data: IElementData;
  dataObj: IDataElementsWall;
}

export interface IDataFull extends IDataElementsWall, IDataProduct {}

export interface IProductRoom {
  dataProduct: IDataProduct;
  nameRoom: string;
  // arrElements: IArrElements[];
}
export interface IElementsProducts {
  elementsData: IArrElements[];
  toggleElementVisibility: (index: number, isVisible: boolean) => void;
  visibleElements: boolean;
  setElementsData: () => void;
  onSaveDataElement: (data: IElementData) => void;
  setElementsWallModalVisible: () => void;
}
