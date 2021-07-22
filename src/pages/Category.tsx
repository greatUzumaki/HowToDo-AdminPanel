import {
  Card,
  CardContent,
  Grid,
  Icon,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryApi, Configuration, GetCategoryDto } from '../api';

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
    width: '6em',
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
    paddingBottom: '16px !important',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4em',
    textDecoration: 'none',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  text: {
    fontSize: 25,
  },
});

function Category() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const API = new CategoryApi(new Configuration({ basePath: '/api' }));
      try {
        const getCategories = (await API.getAllCategory()).data;
        setCategories(getCategories);
      } catch {
        enqueueSnackbar('Проблемы с получением категорий', {
          variant: 'error',
        });
      }
    };
    fetch();
  }, [enqueueSnackbar]);

  return (
    <div className='category'>
      <Grid item className={classes.container}>
        {categories &&
          categories.map((item, index) => {
            return (
              <Link to='/awd' className={classes.link} key={index}>
                <Card elevation={3} className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.text} variant='button'>
                      {item.name}
                    </Typography>
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
