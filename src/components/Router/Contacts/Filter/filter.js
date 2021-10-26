import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterAction } from '../../../Redux/Filter/filter-action';
import { filterValue } from '../../../Redux/Contact/contacts-selectors';

function Filter({ filterValue, filter }) {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={filterValue}
      />
    </label>
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
