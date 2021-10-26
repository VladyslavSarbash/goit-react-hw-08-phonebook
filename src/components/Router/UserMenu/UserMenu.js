import { useSelector, useDispatch } from 'react-redux';
import { userName } from '../../Redux/RegisterAndLogin/RegAndLog-selector';
import s from './UserMenu.module.css';
import { userLogout } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

export const UserMenu = () => {
  const nameUser = useSelector(userName);
  const dispatch = useDispatch();

  return (
    <div className={s.userLogout}>
      <p>Добро пожаловать, {nameUser}!</p>
      <button type="button" onClick={() => dispatch(userLogout())}>
        Выход
      </button>
    </div>
  );
};
