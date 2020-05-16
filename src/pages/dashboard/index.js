import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import CardComponent from './cardComponent';
import gistData from './gistData';

function Dashboard() {
  const [gists, setGists] = useState([]);

  const getAllGists = useCallback(() => {
    const token = localStorage.getItem('token');
    const { access_token, scope, token_type } = JSON.parse(token);

    setGists(gistData.data);
    // axios({
    //   method: 'get',
    //   url: `https://api.github.com/gists`,
    //   headers: {
    //     'Authorization': `${token_type} ${access_token}`
    //   }
    // })
    // .then(
    //   res => {
    //     console.log(res);
    //     setGists(res.data);
    //   }
    // )
  });

  useEffect(() => {
    getAllGists();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ paddingTop: 20, paddingBottom: 20 }}>
        {gists.map(gist => (
          <CardComponent key={gist.id} gist={gist} />
        ))}
      </Container>
    </React.Fragment>
  )
}

export default Dashboard;
