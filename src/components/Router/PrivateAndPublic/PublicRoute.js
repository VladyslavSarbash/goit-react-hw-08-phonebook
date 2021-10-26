import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { userOnLogin } from '../../Redux/RegisterAndLogin/RegAndLog-selector';

export const PublicRoute = ({
  children,
  restricted = false,
  redirectTo = '/',
  ...routeProps
}) => {
  const onLogin = useSelector(userOnLogin);
  const shoudRestricted = onLogin && restricted;
  return (
    <Route {...routeProps}>
      {shoudRestricted ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};
