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
import {
  Configuration,
  FeedbackApi,
  GetFeedbackDto,
  GetRequestDto,
  RequestApi,
} from '../api';
import { Feedback } from '../components/Feedback';
import { Request } from '../components/Request';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    minHeight: '90vh',
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
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
  const history = useHistory();

  const deleteFeedback = () => {
    const fetch = async () => {
      const API = new FeedbackApi(new Configuration({ basePath: '/api' }));
      try {
        await API.deleteFeedback(props.id);
        props.setClose(false);
        history.push('/feedback');
        enqueueSnackbar('Фидбек удален!', { variant: 'success' });
      } catch {
        enqueueSnackbar('Ошибка при удалении фидбека', { variant: 'error' });
      }
    };
    fetch();
  };

  return (
    <Dialog open={props.open} onClose={() => props.setClose(false)}>
      <DialogTitle id='responsive-dialog-title'>{'Подтверждение'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить обращение пользователя?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setClose(false)} color='primary'>
          Отмена
        </Button>
        <Button color='secondary' onClick={deleteFeedback}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [feedback, setFeedback] = useState<GetFeedbackDto>();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async (id: string) => {
      const API = new FeedbackApi(new Configuration({ basePath: '/api' }));
      try {
        const getFeedback = (await API.getFeedbackById(id)).data;
        setFeedback(getFeedback);
        setLoading(false);
      } catch {
        enqueueSnackbar('Проблемы с получением информации', {
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
          <Feedback feedback={feedback} />
          <Grid
            item
            style={{
              marginTop: 20,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => setOpen(true)}
              endIcon={<Delete />}
              style={{ width: 300 }}
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

export default FeedbackPage;
