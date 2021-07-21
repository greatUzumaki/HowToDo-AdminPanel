import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

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
  },
});

const info = [
  { name: 'Программирование awdawdwdwad' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
  { name: 'awdawd' },
];

function Home() {
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.container}>
      <Typography className={classes.pageTitle}>Последние заявки</Typography>
      <Divider className={classes.divider} />
      <Grid item className={classes.cardContainer}>
        {info.map((item, index) => {
          return (
            <Link to='#' className={classes.link} key={index}>
              <Card elevation={3} className={classes.card}>
                <CardContent className={classes.cardConten}>
                  <Grid container>
                    <Grid item></Grid>
                    <Grid item></Grid>
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
