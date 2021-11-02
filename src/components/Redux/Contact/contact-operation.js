import axios from 'axios';
// import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getContacts = createAsyncThunk('getContacts', async () => {
  const { data } = await axios.get('/contacts');
  return data;
});

const addContact = createAsyncThunk('addContact', async contact => {
  await axios.post('/contacts', contact);
});

const deleteContact = createAsyncThunk('deleteContact', async id => {
  await axios.delete(`/contacts/${id}`);
  return id;
});

export { addContact, deleteContact, getContacts };
