import { useDispatch } from 'react-redux';
import { newUserRegister } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

export const Register = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    dispatch(newUserRegister(newUser));

    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name
        <input type="text" />
      </label>
      <label>
        Email
        <input type="text" />
      </label>
      <label>
        Password
        <input type="text" />
      </label>
      <button type="submit">Регистрация</button>
    </form>
  );
};
