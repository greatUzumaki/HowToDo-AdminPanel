import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoryApi, Configuration, GetRequestDto } from '../api';
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
    wordBreak: 'break-all',
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

function Category() {
  const classes = useStyles();
  const [requests, setRequests] = useState<GetRequestDto[]>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const fetch = async (category: string) => {
      const API = new CategoryApi(new Configuration({ basePath: '/api' }));
      try {
        const getRequests = (await API.getRequestByName(category)).data;
        setRequests(getRequests);
        setLoading(false);
      } catch {
        enqueueSnackbar('Проблемы с получением заявок', {
          variant: 'error',
        });
      }
    };
    fetch(name);
  }, [enqueueSnackbar, name]);

  return (
    <Grid container direction='column' className={classes.container}>
      <Typography className={classes.pageTitle}>{name}</Typography>
      <Divider className={classes.divider} />
      <Grid item className={classes.cardContainer}>
        {loading ? (
          <CircularProgress />
        ) : (
          requests &&
          requests.map((item, index) => {
            return (
              <Link
                to={`/request/${item.id}`}
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
                          style={{
                            fontSize: 12,
                            alignSelf: 'flex-end',
                            marginLeft: 5,
                          }}
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
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </Grid>
    </Grid>
  );
}

export default Category;
