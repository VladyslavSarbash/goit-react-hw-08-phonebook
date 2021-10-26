import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ContactsIcon from '@mui/icons-material/Contacts';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userOnLogin } from '../../Redux/RegisterAndLogin/RegAndLog-selector';
import s from './Navigation.module.css';
import { UserMenu } from '../UserMenu/UserMenu';

export const Navigation = () => {
  const onLogin = useSelector(state => userOnLogin(state));

  return (
    <>
      <div className={s.Header}>
        <div className={s.Navigation}>
          <NavLink
            exact
            to="/"
            className={s.NavLink}
            activeClassName={s.activeNavLink}
          >
            <HomeSharpIcon className={s.IconsHeader} sx={{ fontSize: 36 }} />
            Главная
          </NavLink>
          {onLogin && (
            <NavLink
              to="/contacts"
              className={s.NavLink}
              activeClassName={s.activeNavLink}
            >
              <ContactsIcon className={s.IconsHeader} sx={{ fontSize: 36 }} />
              Контакты
            </NavLink>
          )}
        </div>

        {onLogin ? (
          <UserMenu />
        ) : (
          <div className={s.RegAndLog}>
            <NavLink
              to="/register"
              className={s.NavLink}
              activeClassName={s.activeNavLink}
            >
              <AppRegistrationIcon sx={{ fontSize: 36 }} />
              Регистация
            </NavLink>
            <NavLink
              to="/login"
              className={s.NavLink}
              activeClassName={s.activeNavLink}
            >
              <LoginIcon sx={{ fontSize: 36 }} />
              Войти
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};
