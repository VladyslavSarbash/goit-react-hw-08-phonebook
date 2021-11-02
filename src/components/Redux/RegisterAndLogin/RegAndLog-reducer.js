import { createReducer } from '@reduxjs/toolkit';
import {
  userLogin,
  userLogout,
  newUserRegister,
  currentUser,
} from './RegAndLog-operation';

export const initialState = {
  auth: { name: null, email: null },
  token: null,
  onLogin: false,
  fetchCurrentUser: false,
  notifyStatus: {},
};

export const RegAndLogReducer = createReducer(initialState, {
  [newUserRegister.fulfilled]: (state, { payload: { user, token } }) => ({
    ...state,
    auth: user,
    token: token,
    onLogin: true,
    notifyStatus: {
      status: 'success',
      message: `Регистрация прошла успешно!`,
    },
  }),
  [newUserRegister.rejected]: state => ({
    ...state,
    notifyStatus: {
      status: 'error',
      message: 'Упс:( Регистрация не удалась!',
    },
  }),
  [userLogin.fulfilled]: (state, { payload }) => ({
    ...state,
    auth: payload.user,
    token: payload.token,
    onLogin: true,
    notifyStatus: { status: 'success', message: 'Вход выполнен успешно!' },
  }),
  [userLogin.rejected]: state => ({
    ...state,
    notifyStatus: {
      status: 'error',
      message: 'Вход выполнить не удалось:(',
    },
  }),
  [currentUser.pending]: state => {
    state.fetchCurrentUser = true;
  },
  [currentUser.fulfilled]: (state, { payload }) => ({
    ...state,
    auth: payload,
    onLogin: true,
    fetchCurrentUser: false,
    notifyStatus: {
      status: 'success',
      message: `Авторизация прошла успешно!`,
    },
  }),
  [currentUser.rejected]: state => {
    state.fetchCurrentUser = false;
  },
  [userLogout.fulfilled]: () => ({
    ...initialState,
    notifyStatus: { status: 'success', message: 'Вы вышли из аккаунта!' },
  }),
});
