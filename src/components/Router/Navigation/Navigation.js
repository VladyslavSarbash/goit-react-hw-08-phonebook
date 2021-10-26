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
            Главная
          </NavLink>
          {onLogin && (
            <NavLink
              to="/contacts"
              className={s.NavLink}
              activeClassName={s.activeNavLink}
            >
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
              Регистация
            </NavLink>
            <NavLink
              to="/login"
              className={s.NavLink}
              activeClassName={s.activeNavLink}
            >
              Войти
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};
