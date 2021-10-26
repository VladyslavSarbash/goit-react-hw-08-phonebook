import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { userName } from '../../Redux/RegisterAndLogin/RegAndLog-selector';
import s from './UserMenu.module.css';
import { userLogout } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

export const UserMenu = () => {
  const nameUser = useSelector(userName);
  const dispatch = useDispatch();

  return (
    <div className={s.userLogout}>
      <p className={s.paragraph}>Добро пожаловать, {nameUser}!</p>
      <button
        className={s.btnLogout}
        type="button"
        onClick={() => dispatch(userLogout())}
      >
        <LogoutIcon sx={{ fontSize: 36 }} />
      </button>
    </div>
  );
};
