import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryApi, Configuration, GetCategoryDto } from '../api';
import { Context } from '../context';

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
    wordBreak: 'break-all',
  },
  link: {
    textDecoration: 'none',
  },
  text: {
    fontSize: 22,
  },
});

function AllCategory() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);

  const context = useContext(Context);

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
              <Link
                to={`/category/${item.name}`}
                className={classes.link}
                key={index}
                onClick={context?.setCategoryName(item.name)}
              >
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

export default AllCategory;
