import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import axios from 'axios';

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
}));

function CardComponent({history, gist: { owner: { login }, files, created_at, description, id } }) {
  const [codeString, setCodeString] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const firstFile = Object.keys(files)[0];
    axios.get(files[firstFile].raw_url)
      .then(
        res => {
          // console.log("==========================================")
          // console.log();
          // console.log("==========================================")
          typeof(res.data) === 'object' ? setCodeString(JSON.stringify(res.data)) : setCodeString(res.data);
        }
      )
  }, [])

  return (
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
      <CardContent>
        <div style={{ maxHeight: 200, overflow: 'hidden' }}>
          <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  )
}

export default withRouter(CardComponent);