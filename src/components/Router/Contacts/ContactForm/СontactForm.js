import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addContact,
  getContacts,
} from '../../../Redux/Contact/contact-operation';
import { getAllContacts } from '../../../Redux/Contact/contacts-selectors';

function ContactForm({ contacts, addContact, getContacts }) {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const checkContact = () => {
    contacts.find(({ name }) => {
      return name === state.name;
    })
      ? alert(`${state.name} is already in contacts.`)
      : newContact();
  };

  const newContact = () => {
    const { name, number } = state;
    const newObj = { name, number };

    addContact(newObj);
  };

  const formInput = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const formSubmit = e => {
    e.preventDefault();
    checkContact();
    reset();
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={formSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={state.name}
            placeholder="Kris Evans"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={formInput}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={state.number}
            placeholder="555-55-55"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={formInput}
          />
        </label>
        <button className="submit_form" type="submit">
          Add contact
        </button>
      </form>
    </>
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
