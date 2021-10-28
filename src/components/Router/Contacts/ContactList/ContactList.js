import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact } from '../../../Redux/Contact/contact-operation';
import inLoader from '../../../Loader/loader';
import {
  filterContacts,
  getLoader,
} from '../../../Redux/Contact/contacts-selectors';
import s from './ContactList.module.css';

function RenderContactList({ contacts, deleteContact, loader }) {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div className="contact-list">
      <ul>
        {loader ? (
          inLoader()
        ) : contacts.length === 0 ? (
          <h2>No contacts</h2>
        ) : (
          <>
            <Grid item xs={12} md={12}>
              <Demo>
                <List dense={dense}>
                  {contacts.map(({ id, name, number }) => {
                    return (
                      <ListItem
                        key={id}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteContact(id)}
                            className={s.iconButton}
                            color="inherit"
                          >
                            <DeleteIcon className={s.deleteIcon} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <AccountCircleIcon
                              sx={{ fontSize: 40 }}
                              className={s.avatar}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${name}: ${number}`}
                          secondary={secondary ? 'Secondary text' : null}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Demo>
            </Grid>
          </>
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
