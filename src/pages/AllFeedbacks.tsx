import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Configuration, FeedbackApi, GetFeedbackDto } from '../api';
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
    fontWeight: 500,
  },
  divider: {
    width: '50%',
  },
  cardContainer: {
    display: 'flex',
    height: 'max-content',
    padding: 20,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  link: { textDecoration: 'none' },
  card: {
    [theme.breakpoints.down('sm')]: {
      width: 330,
    },
    width: 450,
    height: 200,
    margin: 20,
    '&:hover': {
      transform: 'scale(1.03)',
    },
    transition: 'all .2s',
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
    gap: 5,
  },
  main: {
    flexGrow: 1,
    paddingTop: 12,
  },
}));

function Feedback() {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [feedbacks, setFeedbacks] = useState<GetFeedbackDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const API = new FeedbackApi(new Configuration({ basePath: '/api' }));
      try {
        const getFeedbacks = (await API.getAllFeedback()).data;
        setFeedbacks(getFeedbacks);
        setLoading(false);
      } catch {
        enqueueSnackbar('Проблемы с получением фидбеков', {
          variant: 'error',
        });
        setTimeout(() => fetch(), 5000);
      }
    };
    fetch();
  }, [enqueueSnackbar]);

  return (
    <Grid container direction='column' className={classes.container}>
      <Typography className={classes.pageTitle}>Обратная связь</Typography>
      <Divider className={classes.divider} />
      <Grid item className={classes.cardContainer}>
        {loading ? (
          <CircularProgress />
        ) : (
          feedbacks.map((item, index) => {
            return (
              <Link
                to={`/feedback/${item.id}`}
                className={classes.link}
                key={index}
              >
                <Card elevation={3} className={classes.card}>
                  <CardContent className={classes.cardConten}>
                    <Grid container direction='row'>
                      <Grid item className={classes.author}>
                        <Typography>{item.email}</Typography>
                        <Typography
                          variant='subtitle1'
                          style={{
                            fontSize: 12,
                            alignSelf: 'flex-end',
                            marginLeft: 5,
                          }}
                        >
                          {item.phone}
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
                        <Typography>{item.details}</Typography>
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

export default Feedback;
