import { createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  getContacts,
} from '../Contact/contact-operation';
// import {
//   contactAddSuccess,
//   contactAddRequest,
//   contactAddError,
//   getContactsSuccess,
//   getContactsRequest,
//   getContactsError,
//   contactDeleteSuccess,
//   contactDeleteRequest,
//   contactDeleteError,
// } from '../Contact/contact-action';

export const loaderReducer = createReducer(false, {
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [getContacts.pending]: () => true,
  [getContacts.fulfilled]: () => false,
  [getContacts.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

// export const loaderReducer = createReducer(false, {
//   [contactAddRequest]: () => true,
//   [contactAddSuccess]: () => false,
//   [contactAddError]: () => false,
//   [getContactsRequest]: () => true,
//   [getContactsSuccess]: () => false,
//   [getContactsError]: () => false,
//     [contactDeleteRequest]: () => true,
//     [contactDeleteSuccess]: () => false,
//     [contactDeleteError]: () => false,
// });
