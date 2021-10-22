// Пример использования createAction
import { createAction } from '@reduxjs/toolkit';

export const contactAddSuccess = createAction('contactAddSuccess');
export const contactAddRequest = createAction('contactAddRequest');
export const contactAddError = createAction('contactAddError');

export const getContactsSuccess = createAction('getContactsSuccess');
export const getContactsRequest = createAction('getContactsRequest');
export const getContactsError = createAction('getContactsError');

export const contactDeleteSuccess = createAction('contactDeleteSuccess');
export const contactDeleteRequest = createAction('contactDeleteRequest');
export const contactDeleteError = createAction('contactDeleteError');
