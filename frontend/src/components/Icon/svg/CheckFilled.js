import React from 'react';
import withIcon from '../withIcon';

function CheckFilled() {
  return (
    <g>
      <circle cx="12" cy="12" r="12" />
      <path
        fill="#FFF"
        d="M17.863 8.004a1.001 1.001 0 0 1 0 1.416l-6.98 6.98a1 1 0 0 1-1.456-.044l-2.994-3.38a.996.996 0 0 1 .087-1.408.992.992 0 0 1 1.404.093l2.278 2.622 6.246-6.277a.999.999 0 0 1 1.415-.002z"
      />
    </g>
  );
}

export default withIcon(CheckFilled);
