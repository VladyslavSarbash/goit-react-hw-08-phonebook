import { createSelector } from 'reselect';

export const getAllContacts = state => state.contacts;
export const filterValue = state => state.filter;
export const getLoader = state => state.loader;

// С мемоизацией
export const filterContacts = createSelector(
  [getAllContacts, filterValue],
  (contacts, filter) => {
    const lowerValue = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(lowerValue);
    });
  },
);

// Без момеизации
// export const filterContacts = state => {
//   const contacts = getAllContacts(state);
//   const filter = filterValue(state);

//   return contacts.filter(({ name }) => {
//     const lowerValue = filter.toLowerCase();
//     return name.toLowerCase().includes(lowerValue);
//   });
// };
