import { useDispatch } from 'react-redux';
import { userLogin } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

export const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const logUser = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    dispatch(userLogin(logUser));

    e.target[0].value = '';
    e.target[1].value = '';
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email
        <input type="text" />
      </label>
      <label>
        Password
        <input type="text" />
      </label>
      <button type="submit">Вход</button>
    </form>
  );
};
