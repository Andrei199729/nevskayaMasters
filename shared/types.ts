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
}

export interface INavigationScreenProps {
  navigation: NavigationProp<any>;
}
