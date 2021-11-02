import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Configuration, GetRequestDto, RequestApi } from '../api';
import { Request } from '../components/Request';

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
    flexWrap: 'wrap',
  },
  contacts: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

interface IDialog {
  id: string;
  open: boolean;
  setClose: Function;
}

const DeleteDialog = (props: IDialog) => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = () => {
    const fetch = async () => {
      const API = new RequestApi(new Configuration({ basePath: '/api' }));
      try {
        await API.deleteRequest(props.id);
        props.setClose(false);
        window.history.back();
        enqueueSnackbar('Заявка удалена!', { variant: 'success' });
      } catch {
        enqueueSnackbar('Ошибка при удалении заявки', { variant: 'error' });
      }
    };
    fetch();
  };

  return (
    <Dialog open={props.open} onClose={() => props.setClose(false)}>
      <DialogTitle id='responsive-dialog-title'>{'Подтверждение'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить заявку?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setClose(false)} color='primary'>
          Отмена
        </Button>
        <Button color='secondary' onClick={deleteRequest}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function RequestPage() {
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [request, setRequest] = useState<GetRequestDto>();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async (id: string) => {
      const API = new RequestApi(new Configuration({ basePath: '/api' }));
      try {
        const getRequest = (await API.getRequestById(id)).data;
        setRequest(getRequest);
        setLoading(false);
      } catch {
        enqueueSnackbar('Проблемы с получением заявки', {
          variant: 'error',
        });
        setTimeout(() => fetch(id), 5000);
      }
    };
    fetch(id);
  }, [enqueueSnackbar, id]);

  return (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Request request={request} />
          <Grid
            item
            style={{
              marginTop: 20,
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => setOpen(true)}
              endIcon={<Delete />}
            >
              Удалить
            </Button>
          </Grid>
          <DeleteDialog id={id} open={open} setClose={setOpen} />
        </>
      )}
    </Container>
  );
}

export default RequestPage;
