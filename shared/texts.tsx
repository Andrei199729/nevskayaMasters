import {IDataItem, ISelectOption} from './types';

export const errorTextPassword =
  '*Пароль может состоять только из английских букв и цифр и иметь длину от 6 до 24 символов';
export const errorTextEmail =
  '*Указан некорректный Email, попробуйте ввести еще раз.';
export const errorTextEmailRestore = '*Email не найден.';
export const errorNumberCodeRestore = '*Неверный код.';

export const arrSelectStatus: ISelectOption[] = [
  {text: 'Отменено', id: 1},
  {text: 'Не дозвонились', id: 2},
  {text: 'Новая заявка', id: 3},
  {text: 'Согласовано. Выполняется', id: 4},
  {text: 'Замер выполнен', id: 5},
  {text: 'Замер отправлен', id: 6},
];

export const arrSelectPay: ISelectOption[] = [
  {text: 'Не оплачено', id: 1},
  {text: 'Оплачено', id: 2},
  {text: 'Эквайринг', id: 3},
  {text: 'Депозит', id: 4},
];

export const arrSelectCompany: ISelectOption[] = [
  {text: 'Компания1', id: 1},
  {text: 'Компания2', id: 2},
  {text: 'Компания3', id: 3},
  {text: 'Компания4', id: 4},
];

export const arrSelectCity: ISelectOption[] = [
  {text: 'Санкт-Петербург и ЛО', id: 1},
  {text: 'Санкт-Петербург и ЛО', id: 2},
  {text: 'Санкт-Петербург и ЛО', id: 3},
  {text: 'Санкт-Петербург и ЛО', id: 4},
];

export const arrWs: ISelectOption[] = [
  {text: 'Санузел', id: 1},
  {text: 'Санузел', id: 2},
];

export const data: IDataItem[] = [
  {id: '1', name: 'zamer'},
  {id: '2', name: 'zamer 20x15'},
  {id: '3', name: 'zamer 20x15'},
  {id: '4', name: 'Согласовано. Выполняется'},
  {id: '5', name: 'zamer 20x15'},
  {id: '6', name: 'Согласовано отправлен'},
];
