import React, { useState, useEffect } from 'react';
import axios from 'axios';

const withAuth = (ComponentToProtect) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get('/api/auth/verify')
      .then((results) => {
        if (results.status === 200) {
          setLoading(false);
        } else {
          throw new Error(results.error);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setRedirect(true);
      });
  }, []);

  if (loading) {
    return null;
  }
  if (redirect) {
    return <Redirect to='/login' />;
  }
  return (
    <ComponentToProtect {...props} />
  );
};
