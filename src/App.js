import './App.css';
import RenderContactList from './components/ContactList/renderContactList';
import Filter from './components/Filter/filter';
import ContactForm from './components/ContactForm/contactForm';

function App() {
  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <RenderContactList />
    </section>
  );
}

export default App;
