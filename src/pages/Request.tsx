import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Configuration, GetRequestDto, RequestApi } from '../api';
import LinkIcon from '@material-ui/icons/Link';
const dateFormat = require('dateformat');

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
  cardContainer: {
    flexDirection: 'column',
    padding: 15,
    height: '100%',
  },
  mainInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  author: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  desc: {
    marginTop: 20,
    padding: 10,
    flexGrow: 1,
    height: 'max-content',
    border: '1px solid #00000038',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  contacts: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
        <Grid container className={classes.cardContainer}>
          <Grid item className={classes.mainInfo}>
            <Grid item className={classes.author}>
              <Typography variant='h4'>{request?.requestTitle}</Typography>
              <Grid
                item
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }}
              >
                <Typography
                  variant='h6'
                  style={{ wordBreak: 'break-all', marginRight: 5 }}
                >
                  {request?.customerName}
                </Typography>
                <Typography variant='subtitle2'>
                  {request?.customerType === 'entity'
                    ? 'организация'
                    : 'физ.лицо'}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant='button' style={{ fontSize: 18 }}>
              {dateFormat(request?.date, 'dd.mm')}
            </Typography>
          </Grid>
          <Grid item className={classes.desc}>
            <Typography>{request?.requestDetails}</Typography>
          </Grid>
          <Grid item className={classes.info}>
            <Grid item className={classes.contacts}>
              <Typography>
                Номер телефона:{' '}
                <a
                  style={{ textDecoration: 'none', color: 'black' }}
                  href={`tel:${request?.phone}`}
                >
                  {request?.phone}
                </a>
              </Typography>
              <Typography>
                Эл. почта:{' '}
                <a
                  style={{ textDecoration: 'none', color: 'black' }}
                  href={`mailto:${request?.email}`}
                >
                  {request?.email}
                </a>
              </Typography>
            </Grid>
            <Button
              href='https://mai.ru'
              target='_blank'
              variant='outlined'
              endIcon={<LinkIcon />}
            >
              Материалы
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Request;
