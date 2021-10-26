import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userOnLogin } from '../../Redux/RegisterAndLogin/RegAndLog-selector';

export const PrivateRoute = ({ children, ...routeProps }) => {
  const onLogin = useSelector(userOnLogin);

  return (
    <Route {...routeProps}>
      {onLogin ? children : <Redirect to="/login" />}
    </Route>
  );
};
