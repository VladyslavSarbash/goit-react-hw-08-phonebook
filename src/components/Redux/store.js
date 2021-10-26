import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './Contact/contact-reducer';
import filterReducer from './Filter/filter-reducer';
import { loaderReducer } from './Loader/loader-reducer';
import { RegAndLogReducer } from './RegisterAndLogin/RegAndLog-reducer';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const contactReducer = combineReducers({
  items: contactsReducer,
  filter: filterReducer,
  loader: loaderReducer,
});

const rootReducer = combineReducers({
  contacts: contactReducer,
  user: persistReducer(persistConfig, RegAndLogReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
