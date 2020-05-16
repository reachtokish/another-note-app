import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import Files from './files';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  filesHeader: {
    borderBottom: 'solid 1px #ddd'
  }
}));

function CardComponent({history, gist: { owner: { login }, files, created_at, description, id } }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <>
              <Link href="#">{login}</Link>
              &nbsp;/&nbsp;
              <Link component={RouterLink} to={`/gist/${id}`}>
                {Object.keys(files)[0]}
              </Link>
            </>
          }
          subheader={
            <>
              <span>Created - {moment(created_at).format('DD-MM-YYYY')}</span><br />
              <span>{description}</span>
            </>
          }
        />
      </Card>
      {Object.keys(files).map(file => (
        <Card className={classes.root} key={file}>
          <CardHeader
            title={
              <>
                <Typography variant="h6">{file}</Typography>
              </>
            }
            className={classes.filesHeader}
          />
          <CardContent>
            <Files file={files[file]} />
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default withRouter(CardComponent);