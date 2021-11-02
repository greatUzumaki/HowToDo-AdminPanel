import { Paper, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { GetRequestDto } from '../api';
import LinkIcon from '@material-ui/icons/Link';
const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
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
}));

interface IRequest {
  request: GetRequestDto | undefined;
}

export const Request = (props: IRequest) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container className={classes.cardContainer}>
        <Grid item className={classes.mainInfo}>
          <Grid item className={classes.author}>
            <Typography variant='h4'>{props.request?.requestTitle}</Typography>
            <Grid
              item
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
              }}
            >
              <Typography
                variant='h6'
                style={{ wordBreak: 'break-all', marginRight: 5 }}
              >
                {props.request?.customerName}
              </Typography>
              <Typography variant='subtitle2'>
                {props.request?.customerType === 'entity'
                  ? 'организация'
                  : 'физ.лицо'}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant='button' style={{ fontSize: 18 }}>
            {dateFormat(props.request?.date, 'dd.mm')}
          </Typography>
        </Grid>
        <Grid item className={classes.desc}>
          <Typography>{props.request?.requestDetails}</Typography>
        </Grid>
        <Grid item className={classes.info}>
          <Grid item className={classes.contacts}>
            <Typography>
              Номер телефона:{' '}
              <a
                style={{ textDecoration: 'underline', color: 'black' }}
                href={`tel:${props.request?.phone}`}
              >
                {props.request?.phone}
              </a>
            </Typography>
            <Typography>
              Эл. почта:{' '}
              <a
                style={{ textDecoration: 'underline', color: 'black' }}
                href={`mailto:${props.request?.email}`}
              >
                {props.request?.email}
              </a>
            </Typography>
          </Grid>
          <Button
            href={`${props.request?.fileLink}`}
            target='_blank'
            variant='outlined'
            endIcon={<LinkIcon />}
          >
            {props.request?.fileName === null ||
            props.request?.fileName === undefined
              ? 'Материалы'
              : props.request.fileName}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
