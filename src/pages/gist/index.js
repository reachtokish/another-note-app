import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import CardComponent from './cardComponent';

function Gist() {
  let { id } = useParams();
  const [gist, setGist] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const { access_token, scope, token_type } = JSON.parse(token);

    axios({
      method: 'get',
      url: `https://api.github.com/gists/${id}`,
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    })
    .then(
      res => {
        // console.log(res);
        setGist(res.data);
      }
    )
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div>{gist && <CardComponent gist={gist} />}</div>
      </Container>
    </React.Fragment>
  );
}

export default Gist;
