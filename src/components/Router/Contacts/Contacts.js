import { useSelector } from 'react-redux';
import { userOnLogin } from '../../Redux/RegisterAndLogin/RegAndLog-selector';
import RenderContactList from './ContactList/ContactList';
import Filter from './Filter/filter';
import ContactForm from './ContactForm/СontactForm';

export const Contacts = () => {
  const onLogin = useSelector(userOnLogin);
  return (
    <>
      {onLogin && (
        <>
          <ContactForm />
          <Filter />
          <RenderContactList />
        </>
      )}
    </>
  );
};
