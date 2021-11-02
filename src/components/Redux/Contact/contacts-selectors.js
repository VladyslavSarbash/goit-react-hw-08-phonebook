import { createSelector } from 'reselect';

export const getAllContacts = state => state.contacts.items.contacts;
export const notifyStatus = state => state.contacts.items.notifyStatus;
export const filterValue = state => state.contacts.filter;
export const getLoader = state => state.contacts.loader;

export const filterContacts = createSelector(
  [getAllContacts, filterValue],
  (contacts, filter) => {
    const lowerValue = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(lowerValue);
    });
  },
);
