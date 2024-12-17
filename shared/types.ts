import {NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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

export interface INavigationScreenProps {
  navigation: NavigationProp<any>;
}

export interface IAddBlockDimensions {
  numberWall: number;
  saveSizeWall?: IWallData;
}

export interface IModal extends IAddBlockDimensions {
  modalVisible: boolean;
  setModalVisible: any;
}

export interface IDataElementsWall {
  id: number;
  nameElement: string;
  stateElement: string;
}

export interface IDataContext {
  arrElements?: IElementWall[];
  setArrElements: React.Dispatch<React.SetStateAction<IElementWall[]>>;
}

export interface IDataWall extends IAddBlockDimensions, IDataContext {}

export type TNumberObject = {
  [key: string]: string;
};

export type TDataObjElement = {
  [key: string]: string | number;
};

export interface IElementDataObj {
  nameElement: string;
  stateElement: string;
  id: number;
}

export interface IModalWall extends IModal, IDataWall {}
export interface IElementsProducts {
  dataObj: TDataObjElement;
  numberElement: number;
}
export interface IElementsProductsProps {
  elementsData: IElementsProducts[];
  toggleElementVisibility: any;
  visibleElements: boolean;
  setElementsData: React.Dispatch<React.SetStateAction<IElementsProducts[]>>; // Используем типизацию для setState
  onSaveDataElement: (data: IElementWallData) => void;
  setElementsWallModalVisible: any; // Типизация для функции, которая меняет видимость модалки
}
export interface IElementWallData {
  nameElementWall: string;
  heightRight?: string;
  widthTop?: string;
  widthBottom?: string;
  heightLeft?: string;
  radiusElement?: string;
  locationElementTop?: string;
  locationElementRight?: string;
  locationElementLeft?: string;
  locationElementBottom?: string;
}

export interface IElementWall {
  numberElement?: number;
  data: IElementWallData;
  dataObj: TDataObjElement;
}

export interface IArrElementsWall {
  dataObj?: TDataObjElement;
  arrElements?: IElementWall[];
}

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  RestorePassword: undefined;
  Success: undefined;
  NewPassword: undefined;
  Main: {name: string};
  Filter: undefined;
  Search: undefined;
  CreateProject: undefined;
  Policy: undefined;
  UnwrappedProduct: undefined;
  FormDataAddProduct: undefined;
  Product: undefined;
};

// Тип для навигации, который можно использовать в любом экране
export type RootNavigationProp = NavigationProp<RootStackParamList>;
