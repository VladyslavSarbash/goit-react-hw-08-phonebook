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
};

export const RegAndLogReducer = createReducer(initialState, {
  [newUserRegister.fulfilled]: (state, { payload }) => ({
    ...state,
    auth: payload.user,
    token: payload.token,
    onLogin: true,
  }),
  [userLogin.fulfilled]: (state, { payload }) => ({
    ...state,
    auth: payload.user,
    token: payload.token,
    onLogin: true,
  }),
  [currentUser.pending]: state => {
    state.fetchCurrentUser = true;
  },
  [currentUser.fulfilled]: (state, { payload }) => ({
    ...state,
    auth: payload,
    onLogin: true,
    fetchCurrentUser: false,
  }),
  [currentUser.rejected]: state => {
    state.fetchCurrentUser = false;
  },
  [userLogout.fulfilled]: () => initialState,
});
