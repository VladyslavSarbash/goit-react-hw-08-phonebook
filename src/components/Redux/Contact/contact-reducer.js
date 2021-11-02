import { createReducer } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contact-operation';

const initialState = {
  contacts: [],
  notifyStatus: {},
};

const contactsReducer = createReducer(initialState, {
  [getContacts.fulfilled]: (state, action) => ({
    ...state,
    contacts: action.payload,
  }),
  [getContacts.rejected]: state => ({
    ...state,
    notifyStatus: {
      status: 'error',
      message: 'Ошибка! Контакты не получены:(',
    },
  }),
  [addContact.fulfilled]: state => ({
    ...state,
    notifyStatus: { status: 'success', message: 'Контакт добавлен!' },
  }),
  [addContact.rejected]: state => ({
    ...state,
    notifyStatus: {
      status: 'error',
      message: 'Ошибка! Не удалось добавить контакт:(',
    },
  }),
  [deleteContact.fulfilled]: (state, action) => ({
    ...state,
    contacts: state.contacts.filter(i => i.id !== action.payload),
    notifyStatus: { status: 'success', message: 'Контакт удалён!' },
  }),
  [deleteContact.rejected]: state => ({
    ...state,
    notifyStatus: { status: 'error', message: 'Ошибка! Контакт не удалён!' },
  }),
});

export default contactsReducer;
