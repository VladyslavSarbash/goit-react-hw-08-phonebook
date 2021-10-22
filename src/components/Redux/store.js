import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './Contact/contact-reducer';
import filterReducer from './Filter/filter-reducer';
import { loaderReducer } from './Loader/loader-reducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  loader: loaderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
