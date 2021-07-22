import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Configuration, GetRequestDto, RequestApi } from '../api';
import { Context } from '../context';
const dateFormat = require('dateformat');

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: 'max-content',
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  divider: {
    width: '50%',
  },
  cardContainer: {
    display: 'flex',
    height: 'max-content',
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  link: { textDecoration: 'none' },
  card: {
    [theme.breakpoints.down('sm')]: {
      width: 330,
    },
    width: 500,
    height: 250,
    margin: 20,
    '&:hover': {
      transform: 'scale(1.05)',
      transition: '300ms',
    },
  },
  cardConten: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: ' 100%',
    paddingBottom: '16px !important',
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
    paddingTop: 12,
  },
}));

function Home() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [requests, setRequests] = useState<GetRequestDto[]>();

  const context = useContext(Context);

  useEffect(() => {
    const fetch = async () => {
      const API = new RequestApi(new Configuration({ basePath: '/api' }));
      try {
        const getRequests = (await API.getLatestRequest()).data;
        setRequests(getRequests);
      } catch {
        enqueueSnackbar('Проблемы с получением заявок', {
          variant: 'error',
        });
      }
    };
    fetch();
  }, [enqueueSnackbar]);

  return (
    <Grid container direction='column' className={classes.container}>
      <Typography className={classes.pageTitle}>Последние заявки</Typography>
      <Divider className={classes.divider} />
      <Grid item className={classes.cardContainer}>
        {requests &&
          requests.map((item, index) => {
            return (
              <Link
                to={`/category/${item.id}`}
                className={classes.link}
                key={index}
              >
                <Card elevation={3} className={classes.card}>
                  <CardContent className={classes.cardConten}>
                    <Grid container direction='row'>
                      <Grid item className={classes.author}>
                        <Typography>{item.customerName}</Typography>
                        <Typography
                          variant='subtitle1'
                          style={{ fontSize: 12, alignSelf: 'flex-end' }}
                        >
                          {item.customerType === 'entity'
                            ? 'организация'
                            : 'физ.лицо'}
                        </Typography>
                      </Grid>
                      <Grid item direction='row'>
                        <Typography>
                          {dateFormat(item.date, 'dd.mm')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container direction='column' className={classes.main}>
                      <Grid item direction='row' wrap='wrap'>
                        <Typography variant='h5'>
                          {item.requestTitle}
                        </Typography>
                      </Grid>
                      <Grid item direction='row' wrap='wrap'>
                        <Typography>{item.requestDetails}</Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container direction='row'>
                      <Grid item>
                        {
                          context?.categories.find(
                            (i) => i.id === item.categoryId
                          )?.name
                        }
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </Grid>
    </Grid>
  );
}

export default Home;
