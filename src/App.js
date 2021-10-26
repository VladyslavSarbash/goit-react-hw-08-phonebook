import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Homepage } from './components/Router/Homepage/Homepage';
import { Contacts } from './components/Router/Contacts/Contacts';
import { Navigation } from './components/Router/Navigation/Navigation';
import { PageNotFound } from './components/Router/PageNotFound/PageNotFound';
import { Login } from './components/Router/Login/Login';
import { Register } from './components/Router/Register/Register';
import { currentUser } from './components/Redux/RegisterAndLogin/RegAndLog-operation';
import { PrivateRoute } from './components/Router/PrivateAndPublic/PrivateRoute';
import { PublicRoute } from './components/Router/PrivateAndPublic/PublicRoute';
import { fetchCurrentUser } from './components/Redux/RegisterAndLogin/RegAndLog-selector';

function App() {
  const dispatch = useDispatch();
  const isFetchcurrentUser = useSelector(fetchCurrentUser);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <section>
      {!isFetchcurrentUser && (
        <>
          <div className="navigation">
            <Navigation />
          </div>
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <PrivateRoute path="/contacts">
              <Contacts />
            </PrivateRoute>
            <PublicRoute path="/register" redirectTo="/contacts" restricted>
              <Register />
            </PublicRoute>
            <PublicRoute path="/login" redirectTo="/contacts" restricted>
              <Login />
            </PublicRoute>
            <Route component={PageNotFound}></Route>
          </Switch>
        </>
      )}
    </section>
  );
}

export default App;
