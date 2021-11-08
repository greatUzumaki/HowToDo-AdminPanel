import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { GetFeedbackDto } from '../api';
const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
    height: 500,
    '@media (max-width: 900px)': {
      width: 330,
    },
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  details: {
    boxShadow: 'inset 0 0 3px 0 black',
    flexGrow: 1,
    padding: 10,
  },
}));

interface IFeedback {
  feedback: GetFeedbackDto | undefined;
}

export const Feedback = (props: IFeedback) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      <Box className={classes.container}>
        <Box style={{ flexGrow: 1 }}>
          <Typography>
            От:{' '}
            <a
              style={{ textDecoration: 'underline', color: 'black' }}
              href={`mailto:${props.feedback?.email}`}
            >
              {props.feedback?.email}
            </a>
          </Typography>
          <Typography>
            {' '}
            <a
              style={{ textDecoration: 'underline', color: 'black' }}
              href={`tel:${props.feedback?.phone}`}
            >
              {props.feedback?.phone}
            </a>
          </Typography>
        </Box>
        <Typography>{dateFormat(props.feedback?.date, 'dd.mm')}</Typography>
      </Box>
      <Box className={classes.details}>{props.feedback?.details}</Box>
    </Paper>
  );
};
