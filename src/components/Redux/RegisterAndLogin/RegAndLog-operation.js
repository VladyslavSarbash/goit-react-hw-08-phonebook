import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userToken } from './RegAndLog-selector';

const BASE_URL = 'https://connections-api.herokuapp.com';
axios.defaults.baseURL = BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const newUserRegister = createAsyncThunk('user/new', async user => {
  const { data } = await axios.post('/users/signup', user);
  token.set(data.token);
  return data;
});

export const userLogin = createAsyncThunk('user/login', async user => {
  const { data } = await axios.post('/users/login', user);
  token.set(data.token);
  return data;
});

export const userLogout = createAsyncThunk('user/logout', async () => {
  await axios.post('/users/logout');
  token.unset();
});

export const currentUser = createAsyncThunk(
  `user/current`,
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = userToken(state);

    if (!persistedToken) return thunkAPI.rejectWithValue();

    token.set(persistedToken);

    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {}
  },
);
