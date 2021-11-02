import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Homepage } from './components/Router/Homepage/Homepage';
import { Contacts } from './components/Router/Contacts/Contacts';
import { Navigation } from './components/Router/Navigation/Navigation';
import { PageNotFound } from './components/Router/PageNotFound/PageNotFound';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './components/Router/Register/SignUp';
import SignIn from './components/Router/Login/SignIn';
import { currentUser } from './components/Redux/RegisterAndLogin/RegAndLog-operation';
import { PrivateRoute } from './components/Router/PrivateAndPublic/PrivateRoute';
import { PublicRoute } from './components/Router/PrivateAndPublic/PublicRoute';
import { fetchCurrentUser } from './components/Redux/RegisterAndLogin/RegAndLog-selector';
import { ToastContainer } from 'react-toastify';
import { notifyStatus } from './components/Redux/RegisterAndLogin/RegAndLog-selector';
import { notifySuccess, notifyError } from './components/Notify/Notify';

function App() {
  // нужен для Loader, когда идёт запрос по текущему user
  // В данный момент Loader нет. Стоит чисто для того, чтобы ничего не мигало при запросе
  const isFetchcurrentUser = useSelector(fetchCurrentUser);
  const notify = useSelector(notifyStatus);
  const dispatch = useDispatch();

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
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <section>
      {!isFetchcurrentUser && (
        <>
          <CssBaseline />
          <div className="navigation">
            <Navigation />
          </div>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <PrivateRoute path="/contacts">
              <Contacts />
            </PrivateRoute>
            <PublicRoute path="/register" redirectTo="/contacts" restricted>
              <SignUp />
            </PublicRoute>
            <PublicRoute path="/login" redirectTo="/contacts" restricted>
              <SignIn />
            </PublicRoute>
            <Route component={PageNotFound}></Route>
          </Switch>
          <ToastContainer theme="colored" autoClose={2000} />
        </>
      )}
    </section>
  );
}

export default App;
