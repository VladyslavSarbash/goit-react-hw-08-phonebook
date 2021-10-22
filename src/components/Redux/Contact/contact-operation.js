import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import {
//   contactAddError,
//   contactAddSuccess,
//   contactAddRequest,
//   getContactsSuccess,
//   getContactsRequest,
//   getContactsError,
//   contactDeleteError,
//   contactDeleteRequest,
//   contactDeleteSuccess,
// } from './contact-action';

const getContacts = createAsyncThunk('getContacts', async () => {
  const { data } = await axios.get('http://localhost:3000/contacts');
  return data;
});

const addContact = createAsyncThunk('addContact', async contact => {
  await axios.post('http://localhost:3000/contacts', contact);
  return contact;
});

const deleteContact = createAsyncThunk('deleteContact', async id => {
  axios.delete(`http://localhost:3000/contacts/${id}`);
  return id;
});

export { addContact, deleteContact, getContacts };

// const getContacts = () => async dispatch => {
//   dispatch(getContactsRequest());

//   try {
//     const { data } = await axios.get('http://localhost:3000/contacts');
//     dispatch(getContactsSuccess(data));
//   } catch (error) {
//     dispatch(getContactsError(error));
//   }
// };

// const addContact = contact => async dispatch => {
//   dispatch(contactAddRequest());

//   try {
//     await axios.post('http://localhost:3000/contacts', contact);
//     dispatch(contactAddSuccess(contact));
//   } catch (error) {
//     dispatch(contactAddError(error));
//   }
// };

// const deleteContact = id => async dispatch => {
//   dispatch(contactDeleteRequest());

//   try {
//     axios.delete(`http://localhost:3000/contacts/${id}`);
//     dispatch(contactDeleteSuccess(id));
//   } catch (error) {
//     dispatch(contactDeleteError(error));
//   }
// };
