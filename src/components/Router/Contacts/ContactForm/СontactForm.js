import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { notifySuccess, notifyError } from '../../../Notify/Notify';
import PropTypes from 'prop-types';
import {
  addContact,
  getContacts,
} from '../../../Redux/Contact/contact-operation';
import {
  getAllContacts,
  notifyStatus,
} from '../../../Redux/Contact/contacts-selectors';

const theme = createTheme();

function ContactForm({ contacts, addContact, getContacts }) {
  const [state, setState] = useState({
    name: '',
    number: '',
  });
  const [disable, setDisable] = useState(true);
  const notify = useSelector(notifyStatus);

  useEffect(() => {
    const { status, message } = notify;

    switch (status) {
      case 'error':
        notifyError(message);
        break;

      case 'success':
        notifySuccess(message);
        break;

      default:
        return;
    }
  }, [notify]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    const { name, number } = state;
    // Если ввести 5 цифр подряд, то последующий ввод букв будет расцениваться, как true
    const validateNumber =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
        number,
      );
    // каждый 2 пробел, подряд, приводит к true
    const validateName =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(name);

    if (validateNumber && validateName) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [state]);

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
    const { value, name } = e.target;
    if (value.length > 25 && name === 'name') return;

    if (value.length > 15 && name === 'number') return;

    setState({
      ...state,
      [name]: value,
    });
  };

  const newContact = () => {
    const { name, number } = state;

    addContact({
      name,
      number,
    });

    getContacts();
  };

  const reset = () => {
    setState({
      name: '',
      number: '',
    });
    setDisable(true);
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
              required
              value={state.name}
              margin="normal"
              fullWidth
              id="name"
              label="Contact name"
              name="name"
              helperText="example: Kris Evans"
              autoComplete="name"
              onChange={textInput}
              autoFocus
            />
            <TextField
              required
              value={state.number}
              margin="normal"
              fullWidth
              name="number"
              label="Number"
              helperText="example: 555-55-55"
              type="tel"
              id="number"
              autoComplete="number"
              onChange={textInput}
            />
            <Button
              disabled={disable}
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
