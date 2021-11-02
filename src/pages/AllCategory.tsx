import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
  Fab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryApi, Configuration, GetCategoryDto } from '../api';
import { Context } from '../context';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';

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
  add: {
    color: 'white',
    margin: 30,
    backgroundColor: 'black',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: '300ms',
      backgroundColor: '#000000c2',
    },
  },
  field: {
    padding: 20,
  },
});

interface IDialog {
  open: boolean;
  setClose: Function;
  setNew: (val: (old: number) => number) => void;
}

const AddDialog = (props: IDialog) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState<string>('');

  const addCategory = () => {
    const fetch = async () => {
      const API = new CategoryApi(new Configuration({ basePath: '/api' }));
      try {
        await API.createCategory(value);
        props.setNew((old) => old + 1);
        closeDialog();
        enqueueSnackbar('Категория успешно добавлена!', {
          variant: 'success',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            enqueueSnackbar('Категория с таким названием уже существует', {
              variant: 'error',
            });
          } else {
            enqueueSnackbar('Проблема с добавлением категории', {
              variant: 'error',
            });
          }
        }
      }
    };
    fetch();
  };

  const closeDialog = () => {
    props.setClose(false);
    setValue('');
  };

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <DialogTitle>Добавление новой категории</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите название категории:</DialogContentText>
        <TextField
          className={classes.field}
          value={value}
          variant='outlined'
          onChange={(e) => setValue(e.target.value as string)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color='default'>
          Отмена
        </Button>
        <Button color='primary' onClick={addCategory}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function AllCategory() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [newCategory, setNew] = useState(0);

  const context = useContext(Context);

  useEffect(() => {
    const fetch = async () => {
      const API = new CategoryApi(new Configuration({ basePath: '/api' }));
      try {
        const getCategories = (await API.getAllCategory()).data;
        setCategories(getCategories);
        setLoading(false);
      } catch {
        enqueueSnackbar('Проблемы с получением категорий', {
          variant: 'error',
        });
        setTimeout(() => fetch(), 5000);
      }
    };
    fetch();
  }, [enqueueSnackbar, newCategory]);

  return (
    <div className='category'>
      <Grid item className={classes.container}>
        {loading ? (
          <CircularProgress />
        ) : (
          categories &&
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
          })
        )}
        {!loading && (
          <Fab className={classes.add} onClick={() => setOpen(true)}>
            <AddIcon style={{ fontSize: 55 }} />
          </Fab>
        )}
        <AddDialog open={open} setClose={setOpen} setNew={setNew} />
      </Grid>
    </div>
  );
}

export default AllCategory;
