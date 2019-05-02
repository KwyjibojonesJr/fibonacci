import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Welcome to the Other Page!
      <Link to="/">Go back to the Home page</Link>
    </div>
  );
};
