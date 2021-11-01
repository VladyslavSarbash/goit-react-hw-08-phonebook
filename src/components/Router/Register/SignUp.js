import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { newUserRegister } from '../../Redux/RegisterAndLogin/RegAndLog-operation';

const theme = createTheme();

export default function SignUp() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [disableBtn, setDisableBtn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const { name, email, password } = state;
    if (name && email && password.length >= 6) {
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
  }, [state]);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(newUserRegister(state));
  };

  const formInput = e => {
    setState(state => ({
      ...state,
      [e.target.name]: e.target.value,
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
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  onChange={formInput}
                  helperText="example: Jack Richer"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText="example: JackRicher@gmail.com"
                  onChange={formInput}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText="min 6 symbol"
                  onChange={formInput}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={disableBtn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
