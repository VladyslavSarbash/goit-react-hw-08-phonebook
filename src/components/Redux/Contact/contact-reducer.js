import { createReducer } from '@reduxjs/toolkit';
// import {
//   contactAddSuccess,
//   getContactsSuccess,
//   contactDeleteSuccess,
// } from './contact-action';
import { getContacts, addContact, deleteContact } from './contact-operation';

const contactsReducer = createReducer([], {
  [getContacts.fulfilled]: (_, action) => action.payload,
  [addContact.fulfilled]: (state, action) => [action.payload, ...state],
  [deleteContact.fulfilled]: (state, action) =>
    state.filter(i => i.id !== action.payload),
});

export default contactsReducer;
