import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

const theme = createTheme();

export default function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [disableBth, setDisableBtn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const { email, password } = state;

    if (email && password.length >= 6) {
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
  }, [state]);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(userLogin(state));
  };

  const formInput = ({ target }) => {
    setState(state => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              helperText="example: JackRicher@gmail.com"
              autoComplete="email"
              onChange={formInput}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText="min 6 symbol"
              autoComplete="current-password"
              onChange={formInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableBth}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
