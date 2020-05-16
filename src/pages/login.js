import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import githubIco from '../assets/images/github-icon.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
}));

function Login({ history }) {
  const classes = useStyles();

  const getToken = () => {
    const url = location.href;
    const code = new URL(url).searchParams.get("code");
    const tokenDetails = localStorage.getItem('token');

    if(code && !tokenDetails) {
      axios({
        method: 'post',
        url: `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`,
        params: {
          'code': code,
          'client_id': '2ee5e7ed33fd851bfb4a',
          'client_secret': '0ef2987cee8a46a99dbb398a6c5ed331de0773aa'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(
        res => {
          // console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data));
          history.push('/dashboard')
        }
      )
    }
  }

  useEffect(() => {
    getToken();
}, [])

  return (
    <div className="center">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        startIcon={<img src={githubIco} alt="" style={{ width: 50 }} />}
        onClick={() => window.location.href = 'https://github.com/login/oauth/authorize?scope=gist&client_id=2ee5e7ed33fd851bfb4a'}
      >
        Login With Github
      </Button>
    </div>
  )
}

export default withRouter(Login);
