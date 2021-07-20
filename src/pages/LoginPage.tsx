import {
  Paper,
  CssBaseline,
  Grid,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  makeStyles,
  Container,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '90vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#15171c',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 0),
    height: 40,
    background: '#15171c',
    color: 'white',
    '&:hover': {
      background: '#494f5f',
    },
  },
}));

function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container maxWidth={'xs'}>
        <Paper elevation={3} style={{ padding: 40 }}>
          <CssBaseline />
          <Grid item className={classes.title}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Авторизация
            </Typography>
          </Grid>
          <form className={classes.form}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='login'
              label='Логин'
              name='login'
              autoComplete='login'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Запомнить меня'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
