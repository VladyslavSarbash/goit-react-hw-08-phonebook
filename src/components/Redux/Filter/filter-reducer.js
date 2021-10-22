import { createReducer } from '@reduxjs/toolkit';
import { filterAction } from './filter-action';

const filterReducer = createReducer('', {
  [filterAction]: (_, action) => action.payload,
});

export default filterReducer;
