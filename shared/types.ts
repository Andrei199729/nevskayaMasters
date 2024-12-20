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
  data: any;
  dataObj: any;
}

export interface IDataContext {
  arrElements?: IElementWall[];
  setArrElements: (elements: IElementWall[]) => void;
}
