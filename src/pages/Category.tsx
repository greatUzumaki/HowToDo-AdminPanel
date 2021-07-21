import {
  Card,
  CardContent,
  Grid,
  Icon,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 'max-content',
    padding: 50,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    width: '5em',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '300ms',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '4em',
    width: '100%',
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
  },
  text: {
    fontSize: 18,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  icon: {
    width: 60,
    height: 60,
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

function Category() {
  const classes = useStyles();
  return (
    <div className='category'>
      <Grid item className={classes.container}>
        {info.map((item, index) => {
          return (
            <Link to='/awd' className={classes.link} key={index}>
              <Card elevation={3} className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Icon className={classes.icon}>
                    <AcUnitIcon className={classes.icon} />
                  </Icon>
                  <Grid item className={classes.textContainer}>
                    <Typography className={classes.text}>
                      {item.name}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </div>
  );
}

export default Category;
