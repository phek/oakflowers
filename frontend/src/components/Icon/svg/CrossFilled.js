import React from 'react';
import withIcon from '../withIcon';

function CrossFilled() {
  return (
    <g>
      <circle cx="12" cy="12" r="12" />
      <path
        fill="#FFF"
        d="M12.001 10.587l3.844-3.844a1 1 0 0 1 1.414 1.415L13.416 12l3.843 3.844a1 1 0 0 1-1.414 1.414l-3.844-3.843-3.843 3.843a1 1 0 1 1-1.415-1.414l3.844-3.844-3.844-3.843a1 1 0 0 1 1.415-1.415L12 10.587z"
      />
    </g>
  );
}

export default withIcon(CrossFilled);
