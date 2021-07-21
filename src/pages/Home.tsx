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
  },
}));

const info = [
  { name: 'Программие', date: '18.20 10:10', type: 'физ. лицо' },
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
                  <Grid container direction='row'>
                    <Grid item className={classes.author}>
                      <Typography>{item.name}</Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontSize: 12, alignSelf: 'flex-end' }}
                      >
                        {item.type}
                      </Typography>
                    </Grid>
                    <Grid item direction='row'>
                      <Typography>{item.date}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container direction='column' className={classes.main}>
                    <Grid item direction='row' wrap='wrap'>
                      <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item direction='row' wrap='wrap'>
                      <Typography>{item.name}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container direction='row'>
                    <Grid item>Бизнес</Grid>
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
