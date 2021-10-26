import * as React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterAction } from '../../../Redux/Filter/filter-action';
import { filterValue } from '../../../Redux/Contact/contacts-selectors';

function Filter({ filterValue, filter }) {
  return (
    <>
      <h2 className="title-contact">Контакты</h2>
      <div className="filter-contacts">
        <TextField
          type="text"
          name="filter"
          value={filter}
          onChange={filterValue}
          required
          id="outlined-required"
          label="Поиск контакта"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </div>
    </>
  );
}

const stateProp = state => ({
  filter: filterValue(state),
});

const filterDispatch = dispatch => ({
  filterValue: ({ target }) => dispatch(filterAction(target.value)),
});

export default connect(stateProp, filterDispatch)(Filter);

Filter.propTypes = {
  filterInput: PropTypes.func,
  Filter: PropTypes.string,
};
