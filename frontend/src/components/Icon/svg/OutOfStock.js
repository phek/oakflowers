import React from 'react';
import withIcon from '../withIcon';

function OutOfStock() {
  return (
    <path d="M3 6.5h5v5H3v-5zm-3 6h5v5H0v-5zm6 0h5v5H6v-5zm13.328-2.086l2.122-2.121a1 1 0 0 1 1.414 1.414l-2.121 2.121 2.121 2.122a1 1 0 1 1-1.414 1.414l-2.122-2.121-2.12 2.12a1 1 0 0 1-1.415-1.413l2.121-2.122-2.121-2.12a1 1 0 1 1 1.414-1.415l2.121 2.121z" />
  );
}

export default withIcon(OutOfStock);
