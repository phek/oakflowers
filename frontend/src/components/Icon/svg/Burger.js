import React from 'react';
import withIcon from '../withIcon';

function Burger() {
  return (
    <path d="M2 3h20a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2zm0 8h20a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 8h20a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z" />
  );
}

export default withIcon(Burger);
