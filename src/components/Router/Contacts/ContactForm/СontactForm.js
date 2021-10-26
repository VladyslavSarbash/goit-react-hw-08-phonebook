import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  addContact,
  getContacts,
} from '../../../Redux/Contact/contact-operation';
import { getAllContacts } from '../../../Redux/Contact/contacts-selectors';

const theme = createTheme();

function ContactForm({ contacts, addContact, getContacts }) {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleSubmit = event => {
    event.preventDefault();

    checkContact();
    reset();
  };

  const checkContact = () => {
    contacts.find(({ name }) => {
      return name === state.name;
    })
      ? alert(`${state.name} is already in contacts.`)
      : newContact();
  };

  const textInput = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const newContact = () => {
    const { name, number } = state;

    addContact({
      name,
      number,
    });
  };

  const reset = () => {
    setState({
      name: '',
      number: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>+</Avatar>
          <Typography component="h1" variant="h5">
            Новый контакт
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={state.name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Contact name"
              name="name"
              autoComplete="name"
              onChange={textInput}
              autoFocus
            />
            <TextField
              value={state.number}
              margin="normal"
              required
              fullWidth
              name="number"
              label="Number"
              type="phone"
              id="number"
              autoComplete="number"
              onChange={textInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const stateProps = state => ({
  contacts: getAllContacts(state),
});

const newContactDispatch = dispatch => ({
  addContact: contact => dispatch(addContact(contact)),
  getContacts: () => dispatch(getContacts()),
});

export default connect(stateProps, newContactDispatch)(ContactForm);

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
