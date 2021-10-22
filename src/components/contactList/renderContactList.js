import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact } from '../Redux/Contact/contact-operation';
import inLoader from '../Loader/loader';
import { filterContacts, getLoader } from '../Redux/contacts-selectors';

function RenderContactList({ contacts, deleteContact, loader }) {
  return (
    <div>
      <ul>
        {loader ? (
          inLoader()
        ) : contacts.length === 0 ? (
          <h2>No contacts</h2>
        ) : (
          contacts.map(({ id, name, number }) => {
            return (
              <li key={id}>
                {name}: {number}
                <button
                  className="item-list"
                  id={id}
                  type="button"
                  onClick={() => deleteContact(id)}
                >
                  Delete
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

const stateProp = state => ({
  contacts: filterContacts(state),
  loader: getLoader(state),
});

const deleteDispatch = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
});

export default connect(stateProp, deleteDispatch)(RenderContactList);

RenderContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};
