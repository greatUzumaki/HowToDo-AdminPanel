import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Configuration, GetRequestDto, RequestApi } from '../api';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: 'max-content',
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  paper: {
    height: 500,
    width: '100%',
  },
});

function Request() {
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [request, setRequest] = useState<GetRequestDto>();
  const classes = useStyles();

  useEffect(() => {
    const fetch = async (id: string) => {
      const API = new RequestApi(new Configuration({ basePath: '/api' }));
      try {
        const getRequest = (await API.getRequestById(id)).data;
        setRequest(getRequest);
      } catch {
        enqueueSnackbar('Проблемы с получением заявок', {
          variant: 'error',
        });
      }
    };
    fetch(id);
  }, [enqueueSnackbar, id]);

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography>awdawd</Typography>
      </Paper>
    </Container>
  );
}

export default Request;
